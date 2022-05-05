const router = require("express").Router()
const db = require("../models")
const bcrypt = require("bcrypt")
const { User } = db

// LOG IN
router.post("/", async (req, res) => {
    let user = await User.findOne({
        where: {
            username: req.body.username
        }
    })

    // IF USER EXISTS AND PASSWORD MATCHES, SEND BACK USER, ELSE SEND 404
    if (user && await bcrypt.compare(req.body.password, user.passwordDigest)) {
        req.session.user_id = user.user_id
        res.status(200).json(user)
    } else {
        res.status(404).json({
            message: "Username or password is incorrect"
        })
    }
})

// GET USER PROFILE
router.get("/profile", async (req, res) => {
    req.currentUser ? res.json(req.currentUser) : res.json({ message: "No current user" })
})

// LOGOUT
router.get("/logout", async (req, res) => {
    req.session = null
    res.json({ message: "Logged out" })
})

module.exports = router