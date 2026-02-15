import TryCatch from "../middlewares/TryCatch.js";
import { Image } from "../models/Image.js";
import { User } from "../models/User.js";

export const getAllImage = TryCatch(async (req, res) => {
  const image = await Image.find();
  res.json({
    image,
  });
});

export const getSingleImage = TryCatch(async (req, res) => {
  const  image= await Image.findById(req.params.id);

  res.json({
    image,
  });
});


    const user = await User.findById(req.user._id);

    const image = await Image.findById(req.params.id);

    await user.save();

    res.status(200).json({
      message: "Image Created Successfully",
    });

