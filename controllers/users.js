const db = require("../models")
const router = require("express").Router()
const bcrypt = require("bcrypt")
const { Op } = require("sequelize")
const { User } = db

// SIGN UP IF USERNAME ISN'T IN USE
router.post("/", async (req, res) => {

    const searchForUser = await User.findOne({
        where: {
            username: req.body.username
        }
    })

    if (searchForUser === null) {
        let { password, ...rest } = req.body
        await User.create({
            ...rest,
            passwordDigest: await bcrypt.hash(password, 12)
        })

        res.json(`User successfully created`)
    } else {
        res.json({
            message: "username or email already in use"
        })
    }
})

// CHECK IF EMAIL IS ALREADY IN USE
router.get("/checkEmail/:email", async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.params.email
        }
    })

    if (user) {
        res.json({
            message: "Email is already in use"
        })
    } else {
        res.json({
            email: req.params.email
        })
    }
})

module.exports = router