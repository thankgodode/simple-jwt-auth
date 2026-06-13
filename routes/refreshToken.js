const express = require('express');
const router = express.Router();

const jwt = require("jsonwebtoken");
const { refreshToken, accessToken } = require("../utils/createJWT")

router.route('/refresh').get((req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ msg: "Unauthorized" })

    jwt.verify(
        token,
        process.env.SECRET_KEY,
        async (err, decoded) => {
            if (err) return res.status(403).json({ msg: "Invalid token" })

            const newToken = accessToken(decoded.username);
            res.json({ token: newToken });
        }
    )
});

module.exports = router;