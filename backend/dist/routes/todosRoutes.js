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
const auth_js_1 = require("./../middleware/auth.js");
const express_1 = require("express");
const todos_js_1 = __importDefault(require("../models/todos.js"));
const addTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = {
            content: req.body.content,
            date: req.body.date,
            time: req.body.time,
            state: req.body.state,
            isCompleted: req.body.isCompleted,
            remind: "",
        };
        const result = yield todos_js_1.default.create(todo, req.params.id);
        if (result !== "wrong id") {
            res.status(200).json({
                todo: Object.assign(Object.assign({}, todo), { _id: result.insertedId, userId: req.params.id }),
                message: "todo added successfully",
            });
        }
        else {
            res.status(404).json({ message: result });
        }
    }
    catch (err) {
        next(err);
    }
});
const updateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = {
            content: req.body.content,
            date: req.body.date,
            time: req.body.time,
            state: req.body.state,
            isCompleted: req.body.isCompleted,
            remind: req.body.remind,
        };
        const result = yield todos_js_1.default.update(todo, req.params.todoid);
        if (result !== "wrong id") {
            res.status(200).json({
                result,
                message: "todo updated successfully",
            });
        }
        else {
            res.status(404).json({ message: result });
        }
    }
    catch (err) {
        next(err);
    }
});
const deleteTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield todos_js_1.default.delete(req.params.todoid);
        if (result !== "wrong id") {
            res.status(200).json({
                id: req.params.todoid,
                message: "todo deleted successfully",
            });
        }
        else {
            res.status(404).json({ message: result });
        }
    }
    catch (err) {
        next(err);
    }
});
const getTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield todos_js_1.default.getOne(req.params.todoid);
        if (result !== "wrong id") {
            res.status(200).json({ result });
        }
        else {
            res.status(404).json({ message: result });
        }
    }
    catch (err) {
        next(err);
    }
});
const todoRoutes = (0, express_1.Router)();
todoRoutes.route("/user/:id/addtodo").post(addTodo);
todoRoutes
    .route("/todo/:todoid")
    .patch(updateTodo)
    .delete(auth_js_1.auth, deleteTodo)
    .get(getTodo);
exports.default = todoRoutes;
