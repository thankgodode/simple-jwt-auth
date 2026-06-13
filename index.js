require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const cookieParser = require("cookie-parser");


const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3000;

const corsOption = {
    origin:"https://simple-jwt-auth-3.onrender.com",
    credentials:true,
    optionSuccessStatus:200,
}

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors(corsOption))

app.use("/", require("./routes/auth"))
app.use("/", require("./routes/refreshToken"))


app.get("/dashboard",require("./middleware/authMiddleware"), (req, res) => {
    res.json({msg:"Welcome to the dashboard", user:req.user.username})
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});