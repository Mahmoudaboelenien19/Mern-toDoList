import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.v2.config({
  cloud_name: "domobky11",
  api_key: "245277776856722",
  api_secret: "uiYogscPfvLzWYLPuq4lmMMXbMY",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: (req, file) => ({
    folder: "todos-App",
    public_id: file.originalname,
  }),
});

export const upload = multer({ storage });
