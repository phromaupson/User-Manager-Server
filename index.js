const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/User");

const app = express();

mongoose.connect(
    "mongodb+srv://kamkon007:kamkon007@cluster0.wourw.mongodb.net/user_maneger?retryWrites=true&w=majority",
    (err, con) => {
        if (err) return console.log(err);

        return console.log("Database Connected");
    }
);

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoute);

// app.use("/", (req, res) => {
//   return res.json({ data: "hello" });
// });

app.listen(8000, () => {
    console.log("server start at port 8000");
});