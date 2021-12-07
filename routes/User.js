const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

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

module.exports = router;