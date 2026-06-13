const jwt = require("jsonwebtoken");

const accessToken = (username) => {
  return jwt.sign({ username },
    process.env.SECRET_KEY, {
    expiresIn:"1m" // realistic 15m/20m
  })
}

const refreshToken = (username) => {
  return jwt.sign({ username }, 
    process.env.SECRET_KEY, {
      expiresIn:"20m" // realistic 1d/2d
    }
  )
}

module.exports = {refreshToken, accessToken};