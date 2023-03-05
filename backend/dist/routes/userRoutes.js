"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_js_1 = __importDefault(require("./../models/users.js"));
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = require("../config.js");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            country: req.body.country,
        };
        const result = yield users_js_1.default.createUser(newUser);
        res
            .status(200)
            .json({ status: 200, result, message: "user created successfully" });
    }
    catch (err) {
        next(err);
    }
});
const getTodos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield users_js_1.default.getAllToDos(req.params.userid);
        res.status(200).json({ message: "get data sucessfull", result });
    }
    catch (err) {
        next(err);
    }
});
const clear = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield users_js_1.default.clear(req.params.userid);
        res.status(200).json({ message: "data cleared sucessfully", result });
    }
    catch (err) {
        next(err);
    }
});
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            email: req.body.email,
            password: req.body.password,
        };
        const result = yield users_js_1.default.authenticate(user);
        if (result) {
            const expiration = { expiresIn: "15s" };
            const accessToken = jsonwebtoken_1.default.sign({ user }, config_js_1.ACCESS_TOKEN_SECRET, expiration);
            const refToken = jsonwebtoken_1.default.sign({ user }, config_js_1.REFRESH_TOKEN_SECRET);
            res.status(200).json(Object.assign(Object.assign({ message: "you logged in sucessfully" }, result), { refToken,
                accessToken }));
        }
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
const userRoutes = (0, express_1.Router)();
userRoutes.route("/user").post(createUser);
userRoutes.route("/user/authenticate").post(authenticate);
userRoutes.route("/user/:userid/todos").get(getTodos).delete(clear);
exports.default = userRoutes;
