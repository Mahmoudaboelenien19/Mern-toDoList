import { auth } from "./../middleware/auth";
import userModel, { UserData, UserInterface } from "./../models/users.js";
import { NextFunction, Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config.js";
import upload from "../middleware/upload.js";
import { connectToMongo, getGridFSBucket } from "../database.js";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser: UserInterface = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      country: req.body.country,
      phone: req.body.phone,
      image: req.body.image || {
        fileId: new ObjectId("6416feef33f9fb8e8c6585cc"),
      },
      gender: req.body.gender,
      notification: [],
    };
    const result = await userModel.createUser(newUser);
    res
      .status(200)
      .json({ status: 200, result, message: "user created successfully" });
  } catch (err) {
    next(err);
  }
};

const getTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userModel.getAllToDos(
      req.params.userid as unknown as ObjectId
    );
    res.status(200).json({ message: "get data sucessfully", result });
  } catch (err) {
    next(err);
  }
};

const clear = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userModel.clear(
      req.params.userid as unknown as ObjectId
    );
    res.status(200).json({ message: "data cleared sucessfully", result });
  } catch (err) {
    next(err);
  }
};

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: UserData = {
      email: req.body.email,
      password: req.body.password,
    };
    const result = await userModel.authenticate(user, next);
    console.log({ result });
    if (result) {
      const expiration = { expiresIn: "15s" };

      const accessToken = jwt.sign(
        { user },
        ACCESS_TOKEN_SECRET as unknown as string,
        expiration
      );

      const refToken = jwt.sign(
        { user },
        REFRESH_TOKEN_SECRET as unknown as string
      );

      res.cookie("access-token", accessToken);
      res.cookie("refresh-token", refToken);
      res.cookie("user-id", result.id.toString());
      res.status(200).json({
        message: "you logged in sucessfully",
        ...result,
        refToken,
        accessToken,
        status: 200,
      });
    }
    // res.json(result);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userid as unknown as ObjectId;
    const user = await userModel.getUser(userId, next);
    res.status(200).json({ user, status: 200 });
  } catch (err) {
    // next(err);
    // console.log(err);
    next(err);
  }
};

const getNewRefToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refToken } = req.body;
  if (!refToken) {
    return res.status(401).json({ message: "unautherized" });
  } else {
    let user = await userModel.verfiyRefToken(refToken, next);
    if (user) {
      const accessTokenExpiration = { expiresIn: "15s" };

      const accessToken = jwt.sign(
        { user },
        ACCESS_TOKEN_SECRET as unknown as string,
        accessTokenExpiration
      );
      const refreshToken = jwt.sign(
        { user },
        REFRESH_TOKEN_SECRET as unknown as string
      );
      res.cookie("access-token", accessToken);
      res.cookie("refresh-token", refToken);
      res.status(200).json({ refreshToken, accessToken });
    }
  }
};

const addNotificationRouteFn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userid;

  const result = await userModel.addNotification(userId, req.body);
  res.json({ result, msg: "noti added" });
};

const deleteNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userid;
  const notificationId = req.params.notificationid;

  const result = await userModel.deleteNotification(userId, notificationId);
  res.json({ result, msg: "noti added" });
};

const isReadNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userid;
  const notificationId = req.params.notificationid;

  const result = await userModel.markasReadNotification(userId, notificationId);
  res.json({ result });
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("updated");
    console.log(req.body);
    const { username, password, image, phone } = req.body;
    let update = {} as UserInterface;
    if (username) {
      update.username = username;
    }
    if (password) {
      update.password = password;
      console.log(password);
    }
    if (phone) {
      update.phone = phone;
    }
    console.log(req.body.image);
    if (req.file) {
      console.log("file");
      const { file } = req;
      console.log(file);
      const metadata = { filename: file.originalname };
      const bucket: any = await getGridFSBucket();
      const writestream = bucket.openUploadStreamWithId(
        file.filename,
        file.originalname,
        { metadata }
      );
      writestream.write(file.buffer);
      writestream.end();
      await new Promise<void>((resolve, reject) => {
        writestream.once("finish", async (data: any) => {
          console.log("finsih");
          update.image = {
            fileId: data._id,
            filename: data.filename,
          };
          resolve();
        });
      });
      // res.json({ success: true });
    }
    console.log(158);
    console.log("update");
    const result = await userModel.update(update, req.params.userid);
    if (result !== "wrong id") {
      res.status(200).json({
        result,
        message: "user updated successfully",
      });
    } else {
      res.status(404).json({ message: result });
    }
  } catch (err) {
    next(err);
  }
};

const logOut = (req: Request, res: Response) => {
  const { refToken } = req.body;
  if (refToken) {
    res.clearCookie("access-token");
    res.clearCookie("user-id");
    res.clearCookie("refresh-token");
    res
      .status(200)
      .json({ status: 200, message: "you logged out successfully" });
  } else {
    res.status(404).json({ status: 404, message: "wrong refresh-token token" });
  }
};

const userRoutes = Router();
userRoutes.route("/file/:id").get(async (req, res) => {
  const db = await connectToMongo();

  const bucket = await getGridFSBucket();
  const imgId = req.params.id;
  console.log({ imgId });

  const file = await bucket.find({ _id: new ObjectId(imgId) }).toArray();
  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }
  const readstream = bucket.openDownloadStream(new ObjectId(imgId));
  readstream.pipe(res);
});

userRoutes.route("/user").post(createUser);
userRoutes.route("/user/authenticate").post(authenticate);
userRoutes.route("/user/:userid/todos").get(auth, getTodos);
userRoutes.route("/user/:userid").get(getUser);
userRoutes.route("/user/logout").post(logOut);
userRoutes.route("/user/auth/refresh").post(getNewRefToken);
userRoutes.route("/user/:userid/cleartodos").delete(auth, clear);
userRoutes.route("/user/:userid/addnotification").patch(addNotificationRouteFn);
userRoutes
  .route("/user/update/:userid")
  .patch(upload.single("image"), auth, updateUser);
userRoutes
  .route("/user/:userid/:notificationid")
  .delete(deleteNotification)
  .patch(isReadNotification);

export default userRoutes;
