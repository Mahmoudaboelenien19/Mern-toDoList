import dotenv from "dotenv";
dotenv.config();

const {
  MongoDB_URL,
  PORT,
  SALT,
  BCRYPT_PASS,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  Cloud_name,
  Api_key,
  Api_secret,
} = process.env;

export {
  MongoDB_URL,
  PORT,
  SALT,
  BCRYPT_PASS,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  Cloud_name,
  Api_key,
  Api_secret,
};
