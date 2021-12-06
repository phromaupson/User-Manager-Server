const express = require("express");
const router = express.Router();

const User = require("../models/userModel");

router.post("/register", (req, res) => {
    console.log(req.body);
    const result = new User(req.body);

    result.save((err, user) => {
        if (err) return res.status(400).json(err);

        user.password = undefined;
        return res.status(201).json(user);
    });
    // return res.json({ message: "User created" });
});

module.exports = router;