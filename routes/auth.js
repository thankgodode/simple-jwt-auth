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
            // withCredentials: true,
            httpOnly: true,
            // sameSite: "Lax",
        });
        res.json({ message: 'Login successful', token: aToken });

    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }   
});

module.exports = router;