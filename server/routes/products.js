import express from "express";
import {
    getAllProduct,
    getSingleProduct,
    // fetchProduct,
    // fetchProducts,
    getMyProduct,
    checkout,
    paymentVerification,
} from "../controllers/products.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/Product/all", getAllProduct);
router.get("/Product/:id", getSingleProduct);


router.get("/myproduct", isAuth, getMyProduct);
router.post("/Product/checkout/:id", isAuth, checkout);
router.post("/verification/:id", isAuth, paymentVerification);

export default router;
