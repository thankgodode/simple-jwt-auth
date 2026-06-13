const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { refreshToken, accessToken } = require("../utils/createJWT")

const router = express.Router();

router.route('/login').post((req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Here you would typically check the username and password against your database
    if (username === 'admin' && password === 'password') {
        const rToken = refreshToken(username);
        const aToken = accessToken(username);

        res.cookie("token", rToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: true,        // required when sameSite is cross-site or on HTTPS
            maxAge: 7 * 24 * 60 * 60 * 1000  // optional: 7 days in ms
        });
        res.json({ message: 'Login successful', token: aToken });

    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }   
});

module.exports = router;