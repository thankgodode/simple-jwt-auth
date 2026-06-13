const jwt = require("jsonwebtoken");

const userVerification = async (req, res, next) => {
  const authHeader = req.headers['authorization']

  console.log("Auth header ", authHeader)

  if (!authHeader) return res.status(403).json({ msg: "Forbidden" })
  
  const token = authHeader.split(" ")[1]
  jwt.verify(
    token,
    process.env.SECRET_KEY,
    async (err, decoded) => {
      if(err) return res.sendStatus(401).json({ msg: "Unauthorized" })
      
        req.user = decoded;

        next()
    }
  )

};

module.exports = userVerification