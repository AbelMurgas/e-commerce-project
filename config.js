import dotenv from "dotenv";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}`.trim() + ".env"),
});

const config = {
  NODE_ENV: process.env.NODE_ENV || "test",
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || "localhost",
  MONGO_URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ssc1tcl.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`,
};

export default config;
