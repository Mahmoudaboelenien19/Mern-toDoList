import { connectToMongo } from "./database";
import { errorMiddleware } from "./middleware/errors.js";
import express from "express";
import { PORT } from "./config.js";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todosRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

connectToMongo();

const app = express();

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/", userRoutes);

app.use("/", todoRoutes);

app.use(errorMiddleware);

app.listen(PORT, (): void => {
  console.log("server runs ");
});
