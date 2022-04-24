//services
const commentsService = require("../services/commentsService")

class CommentsController {
    async add(req, res) {
        const { postId, commentText } = req.body
        const userDetails = req.user
        const newComment = await commentsService.create(commentText, postId,  userDetails)
        res.json(newComment)
    }

    async get(req, res) {
        const { postId } = req.params
        const { page = 1, limit = 10 } = req.query
        const comments = await commentsService.getByPost(postId, parseInt(page), parseInt(limit))
        res.json(comments)
    }

    async remove(req, res) {
        const { commentId } = req.params
        const {user_id} = req.user
        const deletionResult = await commentsService.remove(commentId, user_id)
        res.json(deletionResult)
    }
}

module.exports = new CommentsController()