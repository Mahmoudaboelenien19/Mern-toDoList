import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Api_key, Api_secret, Cloud_name } from "../config.js";

cloudinary.v2.config({
  cloud_name: Cloud_name,
  api_key: Api_key,
  api_secret: Api_secret,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: (req, file) => ({
    folder: "todos-App",
    public_id: file.originalname,
  }),
});

export const upload = multer({ storage });
