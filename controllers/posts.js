const db = require("../models")
const router = require("express").Router()
const { Post, User, Comment, Community } = db

// CREATE A POST
router.post("/", async (req, res) => {
    try {
        if (req.currentUser) {
            const community = await Community.findOne({
                where: {
                    community_name: req.body.community_name
                }
            })
            if (community) {
                await Post.create({
                    ...req.body,
                    community_id: community.community_id,
                    user_id: req.session.user_id
                })
                res.json({ message: "Post created" })
            } else {
                const newCommunity = await Community.create({ community_name: req.body.community_name })
                await Post.create({
                    ...req.body,
                    community_id: newCommunity.community_id,
                    user_id: req.session.user_id
                })
                res.json({ message: "Post and community created" })
            }
        } else {
            res.json({ message: "You must be logged in to create a post" })
        }
    } catch (err) {
        res.status(404).json(err)
    }
})

// GET POSTS TO DISPLAY TO USER, SORTED BY MOST RECENT
router.get("/", async (req, res) => {
    try {
        const posts = await Post.findAll({
            limit: 20,
            order: [['updatedAt', 'DESC']],
            include: [{ model: User, attributes: ['username'] }, { model: Community, attributes: ['community_name'] }]
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

// Get all posts from a community by community_id
router.get("/community/:community_name", async (req, res) => {
    try {
        const foundCommunity = await Community.findOne({
            where: {
                community_name: req.params.community_name
            }
        })
        const communityPosts = await Post.findAll({
            where: {
                community_id: foundCommunity.community_id
            },
            order: [['updatedAt', 'DESC']],
            include: [{ model: User, attributes: ['username'] }, { model: Community, attributes: ['community_name', 'createdAt'] }]
        })
        res.json(communityPosts)
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
            include: [{ model: User, attributes: ['username'] }, { model: Comment, include: [{ model: User, attributes: ['username'] }] }, { model: Community, attributes: ['community_name', 'createdAt'] }],
            order: [[Comment, 'updatedAt', 'DESC']]
        })

        res.status(200).json(foundPost)
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
            include: [{ model: User, attributes: ['username'] }, { model: Community, attributes: ['community_name'] }]
        })
        res.status(200).json(usersPosts)
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