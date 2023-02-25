"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./middleware/errors");
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use(errors_1.errorMiddleware);
app.get("/", (_req, res) => {
    res.json("I am mahmoud");
});
app.listen(config_1.PORT, () => {
    console.log("server runs ");
});
