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
const express_1 = require("express");
const todos_js_1 = __importDefault(require("../models/todos.js"));
const mongodb_1 = require("mongodb");
const addTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("addtodo");
        const todo = {
            _id: new mongodb_1.ObjectId(),
            content: req.body.content,
            date: req.body.date,
            time: req.body.time,
            state: req.body.state,
            iscompleted: req.body.iscompleted,
        };
        const result = yield todos_js_1.default.create(todo, req.params.id, next);
        if (result !== "wrong id") {
            res.status(200).json({ result, message: "todo added successfully" });
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
            iscompleted: req.body.iscompleted,
        };
        const result = yield todos_js_1.default.update(todo, req.params.userid, req.params.todoid, next);
        if (result !== "wrong id") {
            res.status(200).json({ result, message: "todo updated successfully" });
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
todoRoutes.route("/user/:id/addtodo").patch(addTodo);
todoRoutes.route("/user/:userid/updatetodo/:todoid").patch(updateTodo);
exports.default = todoRoutes;
