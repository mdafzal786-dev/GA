import express from "express"

import { addLecture, createCourse, createProduct, deleteCourse, deleteLecture, getAllStats, getAllUser, updateRole } from '../controllers/admin.js';
import { isAdmin, isAuth } from '../middlewares/isAuth.js';
import { uploadFiles } from "../middlewares/multer.js";
import { getMyCourses } from "../controllers/course.js";
import { getMyProduct } from "../controllers/products.js";

const router = express.Router();

router.post("/user/new", isAuth, isAdmin, uploadFiles ,createCourse);
router.post("/Product/new", isAuth, isAdmin, uploadFiles ,createProduct);
router.post("/course/:id",isAuth, isAdmin, uploadFiles, addLecture);
router.post("/Product/:id",isAuth, isAdmin, uploadFiles, addLecture);
router.delete("/course/:id",isAuth, isAdmin,  deleteCourse);
router.delete("/lecture/:id" ,isAuth, isAdmin, deleteLecture )
router.get('/stats', isAuth, isAdmin, getAllStats)
router.get("/mycourse",isAuth,getMyCourses);
router.get("/myproduct",isAuth,getMyProduct);
router.put("/user/:id", isAuth , updateRole);
router.get("/users", isAuth,isAdmin, getAllUser)
export default router;