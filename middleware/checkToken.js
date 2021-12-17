const jwt = require("jsonwebtoken");

exports.checkToken = (req, res, next) => {
    // console.log(req.headers.authtoken);

    jwt.verify(req.headers.authtoken, "kamkon", (err, decoded) => {
        // console.log(decoded.data);
        if (err) return res.status(401).json({ msg: "Token Invalid!" });

        req.decoded = decoded.data;

        next();

        // return res.json(decoded.data);
    });
};