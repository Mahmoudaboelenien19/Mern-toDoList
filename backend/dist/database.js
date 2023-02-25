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
exports.closeMongoConnection = exports.connectToMongo = void 0;
const mongodb_1 = require("mongodb");
const config_js_1 = require("./config.js");
const client = new mongodb_1.MongoClient(config_js_1.MongoDB_URL);
const connectToMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log("connected to mongodb");
        const db = client.db("todo");
        return db;
    }
    catch (err) {
        throw new Error("failed to connect to db ");
    }
});
exports.connectToMongo = connectToMongo;
const closeMongoConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.close();
    console.log("MongoDB connection closed");
});
exports.closeMongoConnection = closeMongoConnection;
