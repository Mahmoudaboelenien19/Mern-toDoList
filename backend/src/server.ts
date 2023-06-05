import { connectToMongo } from "./database";
import { errorMiddleware } from "./middleware/errors.js";
import express from "express";
import { PORT } from "./config.js";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todosRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
connectToMongo();

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "https://mern-app-v44r.onrender.com/",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.static(path.join(path.resolve(), "/react/dist")));

app.use(express.json());

app.use("/api", todoRoutes);
app.use("/api/user", userRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(path.resolve(), "/react/dist/index.html"));
});
app.use(errorMiddleware);

app.listen(PORT, (): void => {
  console.log("server runs");
});
