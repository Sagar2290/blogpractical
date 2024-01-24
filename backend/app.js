const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParser.json());

const feedRoutes = require("./routes/feed");
app.use("/feed", feedRoutes);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(
    "your mongoDB URI"
  )
  .then((result) => {
    app.listen(3000, () => {
      console.log("server running on PORT: 3000");
    });
  })
  .catch((err) => console.log(err));
