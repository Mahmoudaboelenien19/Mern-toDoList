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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class User {
    static hashPass(pass) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.hash(pass + config_js_1.BCRYPT_PASS, Number(config_js_1.SALT));
        });
    }
    static checkEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            // const db = await connectToMongo();
            return yield database_js_1.db.collection("users").findOne({ email });
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield User.checkEmail(userData.email))) {
                // const db = await connectToMongo();
                const collection = database_js_1.db.collection("users");
                const password = yield User.hashPass(userData.password);
                const res = yield collection.insertOne(Object.assign(Object.assign({}, userData), { password }));
                // closeMongoConnection();
                return res;
            }
            else {
                throw new Error("user is already exist");
            }
        });
    }
    authenticate(user, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_js_1.db.collection("users").findOne({ email: user.email });
            console.log({ result });
            if (result) {
                const check = yield bcrypt_1.default.compare(user.password + config_js_1.BCRYPT_PASS, result.password);
                if (check) {
                    return Object.assign(Object.assign({}, user), { id: result._id });
                }
                else {
                    const err = new Error("Wrong password");
                    err.status = 401;
                    throw err;
                }
            }
            else {
                const err = new Error("this user isn't regesitered ..!");
                err.status = 404;
                throw err;
            }
        });
    }
    getAllToDos(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = database_js_1.db.collection("todos");
            const res = yield collection
                .find({ userId: new mongodb_1.ObjectId(userId) })
                .toArray();
            return res;
        });
    }
    clear(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = database_js_1.db.collection("todos");
            const res = yield collection.deleteMany({ userId: new mongodb_1.ObjectId(userId) });
            return res;
        });
    }
    getUser(userId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collection = database_js_1.db.collection("users");
                console.log({ userId });
                const res = yield collection.findOne({ _id: new mongodb_1.ObjectId(userId) });
                console.log("get 1");
                return res;
            }
            catch (err) {
                console.log("get 2");
                const error = new Error("this is wring id");
                error.status = 404;
                throw error;
            }
        });
    }
    verfiyRefToken(refToken, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decode = jsonwebtoken_1.default.verify(refToken, config_js_1.REFRESH_TOKEN_SECRET);
                return decode;
            }
            catch (err) {
                const error = new Error("wrong ref token");
                error.status = 404;
                throw error;
            }
        });
    }
    update(obj, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongodb_1.ObjectId.isValid(userId)) {
                try {
                    // const db = await connectToMongo();
                    const collection = database_js_1.db.collection("users");
                    if (obj.image && obj.image.fileId) {
                        const filesCollection = database_js_1.db.collection("fs.files");
                        const file = yield filesCollection.findOne({
                            _id: new mongodb_1.ObjectId(obj.image.fileId),
                        });
                        console.log({ file });
                        // Add the file data to the user update
                        // obj.image.data = file;
                    }
                    const result = yield collection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(userId) }, { $set: obj }, { returnDocument: "after" });
                    // closeMongoConnection();
                    return result;
                }
                catch (err) {
                    throw new Error("can't update this user");
                }
            }
            else {
                return "wrong id";
            }
        });
    }
    addNotification(userId, { state, time, content, count, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongodb_1.ObjectId.isValid(userId)) {
                try {
                    const notificationObj = {
                        state,
                        time,
                        content,
                        _id: new mongodb_1.ObjectId(),
                        isRead: false,
                        count: count || 0,
                    };
                    const collection = database_js_1.db.collection("users");
                    const result = yield collection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(userId) }, {
                        $push: {
                            notification: notificationObj,
                        },
                        $inc: { count: +1 },
                    }, { returnDocument: "after" });
                    return result;
                }
                catch (err) {
                    throw new Error("can't update this user");
                }
            }
            else {
                return "wrong id";
            }
        });
    }
    //look at projection in this fn then delete this fn
    getNotification(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongodb_1.ObjectId.isValid(userId)) {
                try {
                    // const db = await connectToMongo();
                    const collection = database_js_1.db.collection("users");
                    const result = yield collection
                        .find({ _id: new mongodb_1.ObjectId(userId) }, { projection: { notification: 1 } })
                        .toArray();
                    // closeMongoConnection();
                    return result;
                }
                catch (err) {
                    throw new Error("can't update this user");
                }
            }
            else {
                return "wrong id";
            }
        });
    }
    resetNotification(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongodb_1.ObjectId.isValid(userId)) {
                try {
                    const collection = database_js_1.db.collection("users");
                    const result = yield collection.updateOne({ _id: new mongodb_1.ObjectId(userId) }, { $set: { count: 0 } });
                    return result;
                }
                catch (err) {
                    throw new Error("can't update this user");
                }
            }
            else {
                return "wrong id";
            }
        });
    }
    deleteNotification(userId, notificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongodb_1.ObjectId.isValid(userId)) {
                try {
                    const notificationObj = {
                        _id: new mongodb_1.ObjectId(notificationId),
                    };
                    // const db = await connectToMongo();
                    const collection = database_js_1.db.collection("users");
                    const result = yield collection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(userId) }, {
                        $pull: {
                            notification: notificationObj,
                        },
                    }, { returnDocument: "after" });
                    return result;
                }
                catch (err) {
                    throw new Error("can't update this user");
                }
            }
            else {
                return "wrong id";
            }
        });
    }
    markALlNotificationsAsRead(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongodb_1.ObjectId.isValid(userId)) {
                try {
                    const collection = database_js_1.db.collection("users");
                    const result = yield collection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(userId) }, {
                        $set: {
                            "notification.$[].isRead": true,
                        },
                    });
                    return result;
                }
                catch (err) {
                    throw new Error("can't update this user");
                }
            }
            else {
                return "wrong id";
            }
        });
    }
    markasReadNotification(userId, notificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log({ userId, notificationId });
            if (mongodb_1.ObjectId.isValid(userId)) {
                try {
                    // const db = await connectToMongo();
                    const collection = database_js_1.db.collection("users");
                    const result = yield collection.findOneAndUpdate({
                        _id: new mongodb_1.ObjectId(userId),
                        "notification._id": new mongodb_1.ObjectId(notificationId),
                    }, {
                        $set: {
                            "notification.$.isRead": true,
                        },
                    }, { returnDocument: "after" });
                    // closeMongoConnection();
                    return result;
                }
                catch (err) {
                    throw new Error("can't update this user");
                }
            }
            else {
                return "wrong id";
            }
        });
    }
}
const userModel = new User();
exports.default = userModel;
