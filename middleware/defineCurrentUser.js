const db = require("../models")

const { User } = db

const defineCurrentUser = async (req, res, next) => {
    try {
        let user = await User.findOne({
            where: {
                user_id: req.session.user_id
            }
        })
        req.currentUser = user
        req.session.save()
        next()
    } catch {
        next()
    }
}

module.exports = defineCurrentUser