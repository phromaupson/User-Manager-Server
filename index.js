const express = require("express");

const app = express();

app.use("/", (req, res) => {
  return res.json({ data: "hello" });
});

app.listen(8000, () => {
  console.log("server start at port 8000");
});
