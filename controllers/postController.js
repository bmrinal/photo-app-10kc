//services
const postValidator = require('../services/postValidatorService');
const postService = require('../services/postService');
const imageService = require('../services/imageService');

class postController {

    async create(req, res) {
        const { file, body: { content, isPrivate } } = req
        if (!postValidator.validate({ file, content, isPrivate })) {
            res.status(400).send({ error: "Invalid post data. Please retry" });
        }
        else {
            const { host } = req.headers  
            try {
                const newPost = await postService.create({ file, content, host, user: req.user, isPrivate })
                res.send(newPost)
            }
            catch (err) {
                throw err
            }            
        }
    }

    async get(req, res) {
        const user = req.user
        const { page = 1, limit = 10 } = req.query
        if (user) {
            const posts = await postService.getAllPosts(parseInt(page), parseInt(limit))
            res.json(posts)
        }
        else {
            const posts = await postService.getAllPublicPosts(parseInt(page), parseInt(limit))
            res.json(posts)
        }
    }

    async getUserPosts(req, res) {
        const { page = 1, limit = 10 } = req.query
        const posts = await postService.getAllPublicPosts(parseInt(page), parseInt(limit), req.user)
        res.json(posts)
    }

    async delete(req, res) {
        const { postId } = req.params
        const { user_id } = req.user
        if (!postId) {
            const error = new Error('Invalid Post Id')
            res.send({ error: 'Invalid Post Id' })
            throw (error)

        }
        try {
            const result = await postService.removePost(postId, user_id)
            res.send(result)
        }
        catch (err) {
            // this should go to a logging service (out of scope)
            res.status(500).send(err)
            console.error(err)
        }
    }

    async streamImages(req, res) {

        // Only images for public posts can be streamed. All images belonging to private posts must have a 'token' in the access url

        const { imageId } = req.params
        if (req.user) {
            const stream = await imageService.getImage(imageId)
            stream.pipe(res)
        }
        else {
            const isPrivate = await imageService.isPrivate(imageId)
            if (isPrivate) {
                res.status(401).send("Unauthorized");
            }
            else {
                const imageStream = await imageService.getImage(imageId)

                imageStream.on('error', (err) => {
                    res.status(404).send()
                    console.error(err)
                    // handle error
                })
                imageStream.pipe(res)

            }
        }

    }
}

module.exports = new postController()