import express from "express";

const app = express();
const port = 4000;

app.get("/", (_req, res) => {
  res.json("I am mahmoud");
});

app.listen(port, (): void => {
  console.log("server runs at port " + port);
});
