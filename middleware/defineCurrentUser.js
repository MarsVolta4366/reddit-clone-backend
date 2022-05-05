const db = require("../models")

const { User } = db

const defineCurrentUser = async (req, res, next) => {
    try {
        let user = await User.findOne({
            where: {
                user_id: req.session.user_id
            }
        })
        res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        })
        req.currentUser = user
        next()
    } catch {
        next()
    }
}

module.exports = defineCurrentUser