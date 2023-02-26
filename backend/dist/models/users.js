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
const database_js_1 = require("./../database.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_js_1 = require("../config.js");
const mongodb_1 = require("mongodb");
class User {
    static hashPass(pass) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.hash(pass + config_js_1.BCRYPT_PASS, Number(config_js_1.SALT));
        });
    }
    static checkEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, database_js_1.connectToMongo)();
            return yield db.collection("users").findOne({ email });
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield User.checkEmail(userData.email))) {
                const db = yield (0, database_js_1.connectToMongo)();
                const collection = db.collection("users");
                const password = yield User.hashPass(userData.password);
                const res = yield collection.insertOne(Object.assign(Object.assign({}, userData), { password }));
                console.log({ res });
                (0, database_js_1.closeMongoConnection)();
                return res;
            }
            else {
                throw new Error("user is already exist");
            }
        });
    }
    authenticate(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, database_js_1.connectToMongo)();
            const result = yield db.collection("users").findOne({ email: user.email });
            if (result) {
                const check = yield bcrypt_1.default.compare(user.password + config_js_1.BCRYPT_PASS, result.password);
                if (check) {
                    return user;
                }
                else {
                    throw new Error("wrong password");
                }
            }
            else {
                throw new Error("this user isn't registered");
            }
        });
    }
    getAllToDos(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, database_js_1.connectToMongo)();
            const collection = db.collection("todos");
            const res = collection.find({ userId: new mongodb_1.ObjectId(userId) }).toArray();
            return res;
        });
    }
    clear(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, database_js_1.connectToMongo)();
            const collection = db.collection("todos");
            const res = collection.deleteMany({ userId: new mongodb_1.ObjectId(userId) });
            return res;
        });
    }
}
const userModel = new User();
exports.default = userModel;
