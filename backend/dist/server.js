"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const errors_js_1 = require("./middleware/errors.js");
const express_1 = __importDefault(require("express"));
const config_js_1 = require("./config.js");
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const todosRoutes_js_1 = __importDefault(require("./routes/todosRoutes.js"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
(0, database_1.connectToMongo)();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "https://mern-app-v44r.onrender.com/",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
}));
app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), "/react/dist")));
app.use(express_1.default.json());
app.use("/api", todosRoutes_js_1.default);
app.use("/api/user", userRoutes_js_1.default);
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(path_1.default.resolve(), "/react/dist/index.html"));
});
app.use(errors_js_1.errorMiddleware);
app.listen(config_js_1.PORT, () => {
    console.log("server runs");
});
