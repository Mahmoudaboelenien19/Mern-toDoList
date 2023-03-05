"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_js_1 = require("./middleware/errors.js");
const express_1 = __importDefault(require("express"));
const config_js_1 = require("./config.js");
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const todosRoutes_js_1 = __importDefault(require("./routes/todosRoutes.js"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/", userRoutes_js_1.default);
app.use("/", todosRoutes_js_1.default);
app.use(errors_js_1.errorMiddleware);
app.listen(config_js_1.PORT, () => {
    console.log("server runs ");
});
