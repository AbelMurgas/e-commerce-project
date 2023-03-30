// --- default  library ---
import path from "path";
import { fileURLToPath } from "url";

// --- internal library ---
import config from "./config.js";

// --- external library ----
import mongoose from "mongoose";
import multer from "multer";
import compression from "compression";
import express from "express";
import { v4 } from "uuid";
import bodyParser from "body-parser";
import helmet from "helmet";

// --- Routes import ----
import productRoutes from "./routes/product.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet()); // Secure headers
app.use(compression()); // Compressing data

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    const type = file.mimetype.split("/")[1];
    const fileName = v4() + "." + type;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// --- Routes ---
app.use("/products", productRoutes);

// --- Internal error ---
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose.set("strictQuery", true);
mongoose
  .connect(
    `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@cluster0.ssc1tcl.mongodb.net/${config.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`
  )
  .then((result) => {
    app.listen(config.PORT || 3000, () => {
      console.log(`server up: http://${config.HOST}:${config.PORT}`);
    });
  })
  .catch((err) => console.log(err));
