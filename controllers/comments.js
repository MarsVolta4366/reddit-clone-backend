const db = require("../models")
const router = require("express").Router()
const { Comment } = db

// Create comment
router.post("/", async (req, res) => {
    try {
        if (req.currentUser) {
            await Comment.create({
                ...req.body,
                user_id: req.session.user_id
            })
            res.json({ message: "Comment created" })
        } else {
            res.json({ message: "You must be logged in to create a comment" })
        }
    } catch (err) {
        res.status(404).json(err)
    }
})

// Delete comment
router.delete("/", async (req, res) => {
    try {
        const commentToDelete = await Comment.findOne({
            where: {
                comment_id: req.body.comment_id,
                user_id: req.session.user_id
            }
        })
        await commentToDelete.destroy()
        res.json({ message: "Comment deleted" })
    } catch (err) {
        res.status(404).json(err)
    }
})

// Edit comment
router.put("/", async (req, res) => {
    try {
        await Comment.update(
            { text: req.body.text },
            {
                where: {
                    comment_id: req.body.comment_id,
                    user_id: req.session.user_id
                }
            }
        )
        res.json({ message: "Comment updated" })
    } catch (err) {
        res.status(404).json(err)
    }
})

module.exports = router