const db = require("../models")
const router = require("express").Router()
const { Post, User, Comment } = db

// CREATE A POST
router.post("/", async (req, res) => {
    if (req.currentUser) {
        await Post.create({
            ...req.body,
            user_id: req.session.user_id
        })
        res.json({ message: "Post created" })
    } else {
        res.json({ message: "You must be logged in to create a post" })
    }
})

// GET POSTS TO DISPLAY TO USER, SORTED BY MOST RECENT
router.get("/", async (req, res) => {
    try {
        const posts = await Post.findAll({
            limit: 20,
            order: [['updatedAt', 'DESC']],
            include: { model: User, attributes: ['username'] }
        })
        res.json(posts)
    } catch (err) {
        res.status(404).json(err)
    }
})

// GET CURRENT USERS POSTS, NOT BEING USED CURRENTLY
router.get("/currentUser", async (req, res) => {
    try {
        const usersPosts = await Post.findAll({
            where: {
                user_id: req.session.user_id
            }
        })
        res.status(200).json(usersPosts)
    } catch (err) {
        res.status(404).json(err)
    }
})

// GET ALL OF A USERS POSTS
router.get("/:username", async (req, res) => {
    try {
        const userId = await User.findOne({
            where: {
                username: req.params.username
            }
        })
        const usersPosts = await Post.findAll({
            where: {
                user_id: userId.user_id
            },
            order: [['updatedAt', 'DESC']],
            include: { model: User, attributes: ['username'] }
        })
        res.status(200).json(usersPosts)
    } catch (err) {
        res.status(404).json(err)
    }
})

router.get("/comments/:postId", async (req, res) => {
    try {
        const foundPost = await Post.findOne({
            where: {
                post_id: req.params.postId
            },
            include: [{ model: User, attributes: ['username'] }, { model: Comment, include: [{ model: User, attributes: ['username'] }] }],
            order: [[Comment, 'updatedAt', 'DESC']]
        })

        res.status(200).json(foundPost)
    } catch (err) {
        res.status(404).json(err)
    }
})

router.delete("/:postId", async (req, res) => {
    try {
        const postToDelete = await Post.findOne({
            where: {
                post_id: req.params.postId
            }
        })
        if (req.session.user_id === postToDelete.user_id) {
            await postToDelete.destroy()
            res.status(200).json({ message: "Post successfully deleted" })
        } else {
            res.status(404).json({ message: "Post not found" })
        }
    } catch (err) {
        res.status(404).json(err)
    }
})

router.put("/", async (req, res) => {
    try {
        if (req.session.user_id) {
            await Post.update(
                { text: req.body.text },
                {
                    where: {
                        post_id: req.body.post_id,
                        user_id: req.session.user_id
                    },
                })
            res.json({ message: "Post updated" })
        } else {
            res.json({ message: "Post not found" })
        }
    } catch (err) {
        res.status(404).json(err)
    }
})

module.exports = router