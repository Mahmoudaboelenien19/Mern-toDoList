"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    const status = (err === null || err === void 0 ? void 0 : err.status) || 500;
    const message = (err === null || err === void 0 ? void 0 : err.message) || "error";
    res.status(status).json({ status, message });
};
exports.errorMiddleware = errorMiddleware;
