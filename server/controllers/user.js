import {User} from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sendMail, { sendForgotMail } from "../middlewares/sendMail.js"
import TryCatch from "../middlewares/TryCatch.js"
import nodemailer from "nodemailer"

// -------------------- Existing functions --------------------
export const register = TryCatch(async(req,res)=>{
  const {email,name,password} = req.body

  let user = await User.findOne({email});
  if(user) 
      return res.status(400).json({ message: "User Already exits" });

  const hashPassword = await bcrypt.hash(password,10)
  user = { name, email, password:hashPassword };

  const otp = Math.floor(Math.random() *1000000 );
  const activationToken = jwt.sign({ user, otp }, process.env.activation_Secret, { expiresIn: "5m" });

  const data = { otp };
  await sendMail(email, "Lead By Example", data)

  res.status(200).json({ message:"Otp send to your Mail", activationToken });
})

export const verifyUser = TryCatch(async(req,res)=>{
  const {otp, activationToken} = req.body
  const verify = jwt.verify(activationToken, process.env.activation_Secret)

  if(!verify) return res.status(400).json({ message: "Otp Expired" })
  if(verify.otp !==otp) return res.status(400).json({ message: "Incorrect Otp" })

  await User.create({
    name: verify.user.name,
    email: verify.user.email,
    password: verify.user.password,
  })

  res.json({ message: "User Registred" })
})

export const loginUser = TryCatch(async(req,res)=>{
  const {email,password} = req.body
  const user = await User.findOne({email})

  if(!user) return res.status(400).json({ message:"No User with this email" })

  const matchpassword = await bcrypt.compare(password,user.password);
  if(!matchpassword) return res.status(400).json({ message:"wrong password" })

  const token = await jwt.sign({_id: user._id}, process.env.jwt_Sec,{ expiresIn: "15d" })
  res.json({ message: `welcome back ${user.name}`, token, user })
})

export const myprofile = TryCatch(async(req,res)=>{
  const user = await User.findById(req.user._id)
  res.json({ user });
})

export const forgotPassword = TryCatch(async(req,res)=>{
  const {email} = req.body;
  const user = await User.findOne({email});
  if(!user) return res.status(404).json({ message:"No user with is email" })

  const token = jwt.sign({email}, process.env.forgot_Secret);
  const data = {email, token};
  await sendForgotMail("Lead By Example", data)

  user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;
  await user.save()
  res.json({ message:"Reset Password Link sent to ypur email" })
})

export const resetPassword  = TryCatch(async(req,res)=>{
  const decodedData = jwt.verify(req.query.token, process.env.forgot_Secret);
  const user = await User.findOne({email: decodedData.email});

  if(!user) return res.status(404).json({ message:"No user with is email" })
  if(user.resetPasswordExpire===null || user.resetPasswordExpire< Date.now())
      return res.status(400).json({ message:"Token Expired" })

  const password = await bcrypt.hash(req.body.password,10)
  user.password = password
  user.resetPasswordExpire = null;
  await user.save();
  res.json({ message:"Password Reset Successfully👍" })
})

// -------------------- New function: Block / Unblock user --------------------
export const blockUser = TryCatch(async (req, res) => {
  const { block, reason } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).json({ message: "User not found" });

  user.status = block ? "blocked" : "active";
  await user.save();

  // Send email if blocking
  if (block && reason) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Your account has been blocked",
      text: `Hello ${user.name},\n\nYour account has been blocked by the admin for the following reason:\n\n"${reason}"\n\nIf you think this is a mistake, contact support.`,
    };

    await transporter.sendMail(mailOptions);
  }

  res.status(200).json({ message: `User ${block ? "blocked" : "unblocked"} successfully` });
});
