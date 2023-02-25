import dotenv from "dotenv";
dotenv.config();

const { MongoDB_URL, PORT } = process.env;

export { MongoDB_URL, PORT };
