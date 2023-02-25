import dotenv from "dotenv";
dotenv.config();

const { MongoDB_URL, PORT, SALT, BCRYPT_PASS } = process.env;

export { MongoDB_URL, PORT, SALT, BCRYPT_PASS };
