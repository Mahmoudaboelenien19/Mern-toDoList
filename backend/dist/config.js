"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api_secret = exports.Api_key = exports.Cloud_name = exports.REFRESH_TOKEN_SECRET = exports.ACCESS_TOKEN_SECRET = exports.BCRYPT_PASS = exports.SALT = exports.PORT = exports.MongoDB_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { MongoDB_URL, PORT, SALT, BCRYPT_PASS, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, Cloud_name, Api_key, Api_secret, } = process.env;
exports.MongoDB_URL = MongoDB_URL;
exports.PORT = PORT;
exports.SALT = SALT;
exports.BCRYPT_PASS = BCRYPT_PASS;
exports.ACCESS_TOKEN_SECRET = ACCESS_TOKEN_SECRET;
exports.REFRESH_TOKEN_SECRET = REFRESH_TOKEN_SECRET;
exports.Cloud_name = Cloud_name;
exports.Api_key = Api_key;
exports.Api_secret = Api_secret;
