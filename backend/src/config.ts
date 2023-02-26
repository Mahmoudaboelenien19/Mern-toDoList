import dotenv from "dotenv";
dotenv.config();

const {
  MongoDB_URL,
  PORT,
  SALT,
  BCRYPT_PASS,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = process.env;

export {
  MongoDB_URL,
  PORT,
  SALT,
  BCRYPT_PASS,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
};
