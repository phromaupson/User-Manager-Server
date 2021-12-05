const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb+srv://kamkon007:kamkon007@cluster0.wourw.mongodb.net/user_maneger?retryWrites=true&w=majority",
  (err, con) => {
    if (err) return console.log(err);

    return console.log("Database Connected");
  }
);

app.use("/", (req, res) => {
  return res.json({ data: "hello" });
});

app.listen(8000, () => {
  console.log("server start at port 8000");
});
