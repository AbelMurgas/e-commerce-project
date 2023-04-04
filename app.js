// --- default  library ---

// --- internal library ---
import config from "./config.js";

// --- external library ---
import mongoose from "mongoose";
import multer from "multer";
import compression from "compression";
import express from "express";
import { v4 } from "uuid";
import bodyParser from "body-parser";
import helmet from "helmet";

// --- Routes import ---
import productRoutes from "./routes/product.js";

// --- test ---
import testConfig from "./config.test.js"
const mongoUri = (process.env.NODE_ENV) ? config.MONGO_URI : testConfig.MONGO_URI;

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
  res.status(500).json({ errors: "Internal Error from the server" });
});

mongoose.set("strictQuery", true);
mongoose
  .connect(mongoUri)
  .then((result) => {
      app.listen(config.PORT || 3000, () => {
        if (config.NODE_ENV !== "test"){
          console.log(`server up: http://${config.HOST}:${config.PORT}`);
        }
      });
  })
  .catch((err) => console.log(err));

export default app;
