import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { promisify } from "util";
import fs from 'fs';
import { User } from '../models/User.js';
import { Product } from "../models/Product.js";

const unlinkAsync = promisify(fs.unlink);

export const createCourse = TryCatch(async (req, res) => {
  const { title, description, category, createBy, duration, price } = req.body;
  const image = req.file;

  await Courses.create({
    title,
    description,
    category,
    createBy,
    image: image?.path,
    duration,
    price
  });
  res.status(201).json({
    message: "Course Created Successfully",
  });
});

export const createProduct = TryCatch(async (req, res) => {
  const { title, description, category, createBy, duration, price } = req.body;
  const image = req.file;

  await Product.create({
    title,
    description,
    category,
    createBy,
    image: image?.path,
    duration,
    price
  });
  res.status(201).json({
    message: "Materials Created Successfully",
  });
});

export const addLecture = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  if (!course) return res.status(404).json({
    message: "No Course found with this ID",
  });

  const { title, description } = req.body;
  const file = req.file;

  const lecture = await Lecture.create({
    title,
    description,
    video: file?.path,
    course: course._id,
  });

  res.status(201).json({
    message: "Lecture Added",
    lecture,
  });
});

export const deleteLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  if (!lecture) return res.status(404).json({
    message: "Lecture not found",
  });

  if (lecture.video) {
    try {
      await unlinkAsync(lecture.video);
      console.log("Video deleted successfully");
    } catch (err) {
      console.warn("Failed to delete lecture video file:", err.message);
    }
  }

  await lecture.deleteOne();

  res.json({
    message: "Lecture Deleted",
  });
});

export const deleteCourse = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  if (!course) return res.status(404).json({
    message: "Course not found",
  });

  const lectures = await Lecture.find({ course: course._id });

  await Promise.all(
    lectures.map(async (lecture) => {
      if (lecture.video) {
        try {
          await unlinkAsync(lecture.video);
          console.log("Video deleted");
        } catch (err) {
          console.warn("Failed to delete lecture video:", err.message);
        }
      }
    })
  );

  if (course.image) {
    try {
      await unlinkAsync(course.image);
      console.log("Course image deleted");
    } catch (err) {
      console.warn("Failed to delete course image:", err.message);
    }
  }

  await Lecture.deleteMany({ course: req.params.id });
  await course.deleteOne();

  // Remove the deleted course from all users' subscription lists
  await User.updateMany({}, { $pull: { subscription: req.params.id } });

  res.json({
    message: "Course and associated lectures deleted successfully",
  });
});

export const getAllStats = TryCatch(async (req, res) => {
  const totalCourses = (await Courses.find()).length;
  const totalLectures = (await Lecture.find()).length;
  const totalUsers = (await User.find()).length;

  const stats = {
    totalCourses,
    totalLectures,
    totalUsers,
  };

  res.json({
    stats,
  });
});

export const getAllUser = TryCatch(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } }).select("-password");
  res.json({ users });
});

export const updateRole = TryCatch(async (req, res) => {
  if (req.user.mainrole !== "superadmin") return res.status(403).json({
    message: "This endpoint is assign to superadmin"
  });
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.role === "user") {
    user.role = "admin";
    await user.save();
    return res.status(200).json({
      message: "Role updated to admin",
    });
  }
  if (user.role === "admin") {
    user.role = "user";
    await user.save();
    return res.status(200).json({
      message: "Role updated",
    });
  }

  // if other roles exist, you can extend logic here
});

/**
 * Block / Unblock user
 * Route: PUT /api/user/block/:id
 * Body: { block: true|false, reason?: string }
 * Requires isAuth (req.user available) and only superadmin allowed
 */
export const blockUser = TryCatch(async (req, res) => {
  if (req.user.mainrole !== "superadmin") {
    return res.status(403).json({ message: "Only superadmin can block users" });
  }

  const { id } = req.params;
  const { block, reason } = req.body;

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.status = block ? "blocked" : "active";
  await user.save();

  // Optionally: you can implement email sending here to notify the user about being blocked/unblocked.
  // e.g. sendMail(user.email, `You have been ${block ? "blocked" : "unblocked"}`, reason)

  res.json({
    message: block ? `User blocked. Reason: ${reason || "No reason provided"}` : "User unblocked",
  });
});
