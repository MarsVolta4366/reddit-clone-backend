const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
require("dotenv").config()
const cookieSession = require("cookie-session")
const defineCurrentUser = require("./middleware/defineCurrentUser")

// Was using below instead of bodyparser and urlencoded when running locally
// app.use(express.json())

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 4000

app.use(cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    // secure: true,
    // sameSite: "none"
    sameSite: "strict"
}))

// app.use((req, res, next) => {
//     req["session"].secure = true;
//     next();
// });

// Set up cors again once working on heroku
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

app.use(defineCurrentUser)

app.use("/users", require("./controllers/users"))
app.use("/authentication", require("./controllers/authentication"))
app.use("/posts", require("./controllers/posts"))
app.use("/comments", require("./controllers/comments"))

app.get("/", (__req, res) => {
    res.status(200).json({
        message: "Welcome to my Reddit clone API"
    })
})

app.get("*", (__req, res) => {
    res.send("404")
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})