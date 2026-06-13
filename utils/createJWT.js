const jwt = require("jsonwebtoken");

const accessToken = (email) => {
  return jwt.sign({ email },
    process.env.SECRET_KEY, {
    expiresIn:"1m" // realistic 15m/20m
  })
}

const refreshToken = (email) => {
  return jwt.sign({ email }, 
    process.env.SECRET_KEY, {
      expiresIn:"30m" // realistic 1d/2d
    }
  )
}

module.exports = {refreshToken, accessToken};