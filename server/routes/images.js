import express from "express";
import {
    getAllImage,
    getSingleImage
} from "../controllers/images.js";

const router = express.Router();

router.get("/image/all", getAllImage);
router.get("/image/:id", getSingleImage);
export default router;
