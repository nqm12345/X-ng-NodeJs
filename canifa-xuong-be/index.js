import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./src/routes/index.js";
import bodyParser from "body-parser"; // Thêm import body-parser

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Cấu hình kích thước tối đa của payload
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // Cấu hình kích thước tối đa của payload cho form-urlencoded

mongoose
  .connect(`mongodb://localhost:27017/xuong-canifa`)
  .then(() => {
    console.log(`connect db thanh cong roi!`);
  })
  .catch((err) => console.log(err));

app.use("/api", router);

const errorNotFound = (req, res, next) => {
  const error = new Error(`Not found`);
  error.status = 404;
  next(error);
};

const errorCommon = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    message: err.message || "Loi server",
  });
};

app.use(errorNotFound);
app.use(errorCommon);

app.listen(8000, () => {
  console.log(`server is running on port 8000`);
});
