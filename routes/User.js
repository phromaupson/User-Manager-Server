const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

router.post(
    "/register",
    body("username").not().isEmpty(),
    body("email").isEmail(),
    body("password")
    .isLength({ min: 5 })
    .withMessage("must be at least 5 chars long"),
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log(req.body);

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) return res.status(401).json({ err });

            const result = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash,
            });

            result.save((err, user) => {
                if (err) return res.status(400).json(err);

                user.password = undefined;
                return res.status(201).json(user);
            });
            // return res.json({ message: "User created" });
        });
    }
);

router.post("/login", (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) return res.status(403).json(err);

        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    res
                        .status(405)
                        .json({ msg: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง", data: null });
                    user.password = undefined;
                    return res.status(202).json({ data: user });
                } else {
                    user.password = undefined;

                    const token = jwt.sign({ data: user }, "kamkon");
                    return res.status(202).json({ data: user, token });
                }
            });
        } else {
            return res
                .status(405)
                .json({ msg: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง", data: null });
        }
    });
});

router.get("/all", (req, res) => {
    User.find({}).then((value) => {
        return res.json(value);
    });
});

router.get("/show/:name", (req, res) => {
    // console.log(req.params.name);
    User.findOne({ username: req.params.name }, (err, result) => {
        if (err) return res.json(err);

        return res.json(result);
    });
});

module.exports = router;