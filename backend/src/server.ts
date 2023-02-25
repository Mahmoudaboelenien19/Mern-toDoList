import { errorMiddleware } from "./middleware/errors.js";
import express from "express";
import { PORT } from "./config.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());

app.use("/", userRoutes);

app.use(errorMiddleware);

app.listen(PORT, (): void => {
  console.log("server runs ");
});
