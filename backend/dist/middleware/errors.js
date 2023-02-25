"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res) => {
    const status = (err === null || err === void 0 ? void 0 : err.status) || 404;
    const message = (err === null || err === void 0 ? void 0 : err.message) || "error";
    res.status(status).json({ message });
};
exports.errorMiddleware = errorMiddleware;
