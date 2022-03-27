const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()

app.use(cors())
app.use(express.json())
const port = process.env.PORT || 4000

// ROUTES
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