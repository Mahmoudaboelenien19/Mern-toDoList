import { errorMiddleware } from "./middleware/errors";
import express from "express";
import { PORT } from "./config";

const app = express();

app.use(errorMiddleware);
app.get("/", (_req, res) => {
  res.json("I am mahmoud");
});

app.listen(PORT, (): void => {
  console.log("server runs ");
});
