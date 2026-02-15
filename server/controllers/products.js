import { instance } from "../index.js";
import TryCatch from "../middlewares/TryCatch.js";
import { Product } from "../models/Product.js";  // Consistently using Product
import { User } from "../models/User.js";
import crypto from "crypto";
import { Payment } from "../models/Payment.js";

// Fetch all products
export const getAllProduct = TryCatch(async (req, res) => {
  const products = await Product.find();
  res.json({
    products,  // Changed the key to "products" for better readability
  });
});

// Fetch a single product by its ID
export const getSingleProduct = TryCatch(async (req, res) => {
  const product = await Product.findById(req.params.id);  // Changed to Product model

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json({
    product,
  });
});

// Fetch all products the current user has purchased
export const getMyProduct = TryCatch(async (req, res) => {
  const products = await Product.find({ _id: { $in: req.user.subscription } });  // Ensured correct query

  res.json({
    products,  // Changed the key to "products"
  });
});

// Checkout process to create an order for a product
export const checkout = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (user.subscription.includes(product._id)) {
    return res.status(400).json({
      message: "You already have this product",
    });
  }

  const options = {
    amount: Number(product.price * 100),  // Razorpay amount is in paise (1 INR = 100 paise)
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  res.status(201).json({
    order,
    product,
  });
});

// Payment verification after successful checkout
export const paymentVerification = TryCatch(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.Razorpay_Secret)
    .update(body)
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    const user = await User.findById(req.user._id);
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    user.subscription.push(product._id);

    // Track user progress in the future (commented out for now)
    // await Progress.create({
    //   course: product._id,
    //   completedLectures: [],
    //   user: req.user._id,
    // });

    await user.save();

    res.status(200).json({
      message: "Materials Purchased successfully",
    });
  } else {
    return res.status(400).json({
      message: "Payment failed",
    });
  }
});
