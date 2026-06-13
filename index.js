require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const cookieParser = require("cookie-parser");


const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 5000;

const corsOption = {
    origin:"http://localhost:3000",
    credentials:true,
}

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./routes/auth"))
app.use("/", require("./routes/refreshToken"))


app.get("/dashboard", require("./middleware/authMiddleware"), (req, res) => {
    res.json({msg:"Welcome to the dashboard", user:req.user.username})
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});