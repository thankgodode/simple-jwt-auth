const jwt = require("jsonwebtoken");

const userVerification = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // handle "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Invalid or expired token" });
        }
        req.user = user;
        next();
    });
};

module.exports = userVerification;