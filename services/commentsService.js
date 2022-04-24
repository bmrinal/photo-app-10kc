
const { default: mongoose } = require('mongoose')
const Comments = require('../model/comments')

const customLabels = {
    docs: 'comments',
    totalDocs: 'totalComments'
}
class CommentService {
    async create(commentText, postId, userDetails) {
        try {
            const newComment = Comments.create({
                commentText,
                postId,
                authorId: userDetails && userDetails.user_id,
                authorEmail: userDetails && userDetails.email,
                authorName: userDetails && `${userDetails.first_name} ${userDetails.last_name}`
            })
            return newComment
        } catch (err) {
            console.error(err)
            throw new Error('Error creating comment')
        }
    }
    async getByPost(postId, page, limit) {
        try {
            return await Comments.paginate({ postId }, { page, limit, customLabels })
        }
        catch (err) {
            console.error(err)
            throw new Error('Error getting the comment')
        }

    }
    async remove(commentId, user) {
        try {
            const removedComment = await Comments.findOneAndDelete({ _id: mongoose.Types.ObjectId(commentId), authorId: user })
            if (removedComment) {
                return { removed: 1 }
            }
            return { removed: 0 }
        }
        catch (err) {
            console.error(err)
            throw new Error('Error removing the comment')
        }
    }

    async removeByPost(postId) {
        try {
            const removeComments = await Comments.deleteMany({ postId })
            return removeComments
        }
        catch (err) {
            console.error(err)
            throw new Error('Unable to remove comments from the post')
        }
    }
}

module.exports = new CommentService()