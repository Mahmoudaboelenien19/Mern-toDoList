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
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const database_1 = require("./../database");
class Todos {
    create(todo, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongodb_1.ObjectId.isValid(userId)) {
                try {
                    const db = yield (0, database_1.connectToMongo)();
                    const collection = db.collection("todos");
                    const result = yield collection.insertOne(Object.assign(Object.assign({}, todo), { userId: new mongodb_1.ObjectId(userId) }));
                    (0, database_1.closeMongoConnection)();
                    return result;
                }
                catch (err) {
                    throw new Error("can't create this todo");
                }
            }
            else {
                return "wrong id";
            }
        });
    }
    delete(todoId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongodb_1.ObjectId.isValid(todoId)) {
                try {
                    const db = yield (0, database_1.connectToMongo)();
                    const collection = db.collection("todos");
                    const result = yield collection.findOneAndDelete({
                        _id: new mongodb_1.ObjectId(todoId),
                    });
                    setTimeout(() => {
                        (0, database_1.closeMongoConnection)();
                    }, 1000);
                    return result;
                }
                catch (err) {
                    throw new Error("can't create this todo");
                }
            }
            else {
                return "wrong id";
            }
        });
    }
    update(todo, todoId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongodb_1.ObjectId.isValid(todoId)) {
                try {
                    const db = yield (0, database_1.connectToMongo)();
                    const collection = db.collection("todos");
                    const result = yield collection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(todoId) }, { $set: todo }, { returnDocument: "after" });
                    (0, database_1.closeMongoConnection)();
                    return result;
                }
                catch (err) {
                    throw new Error("can't update this todo");
                }
            }
            else {
                return "wrong id";
            }
        });
    }
    getOne(todoId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongodb_1.ObjectId.isValid(todoId)) {
                try {
                    const db = yield (0, database_1.connectToMongo)();
                    const collection = db.collection("todos");
                    const result = yield collection.findOne({
                        _id: new mongodb_1.ObjectId(todoId),
                    });
                    (0, database_1.closeMongoConnection)();
                    return result;
                }
                catch (err) {
                    throw new Error("can't get this todo");
                }
            }
            else {
                return "wrong id";
            }
        });
    }
}
const todoModel = new Todos();
exports.default = todoModel;
