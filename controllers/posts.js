const db = require("../models")
const router = require("express").Router()
const { Post, User, Comment, Community } = db

// Create a post
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

// Get 20 most recent posts, sorted by most recent
router.get("/", async (_req, res) => {
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

// Get all posts from a community by community_name
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

// Get post with comments by postId for post show page
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

// Get all of a users posts, for user profile page
router.get("/:username", async (req, res) => {
    try {
        const foundUser = await User.findOne({
            where: {
                username: req.params.username
            }
        })
        const usersPosts = await Post.findAll({
            where: {
                user_id: foundUser.user_id
            },
            order: [['updatedAt', 'DESC']],
            include: [{ model: User, attributes: ['username'] }, { model: Community, attributes: ['community_name'] }]
        })
        res.status(200).json(usersPosts)
    } catch (err) {
        res.status(404).json(err)
    }
})

// Delete post by postId
router.delete("/:postId", async (req, res) => {
    try {
        const postToDelete = await Post.findOne({
            where: {
                post_id: req.params.postId,
                user_id: req.session.user_id
            }
        })
        await postToDelete.destroy()
        res.status(200).json({ message: "Post successfully deleted" })
    } catch (err) {
        res.status(404).json(err)
    }
})

// Edit post route
router.put("/", async (req, res) => {
    try {
        await Post.update(
            { text: req.body.text },
            {
                where: {
                    post_id: req.body.post_id,
                    user_id: req.session.user_id
                },
            })
        res.json({ message: "Post updated" })
    } catch (err) {
        res.status(404).json(err)
    }
})

module.exports = router