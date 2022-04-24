
const Post = require('../model/posts')
const commentsService = require('./commentsService')
const imageService = require('./imageService')

const customLabels = {
    docs: 'posts',
    totalDocs: 'totalPosts',
}
class PostService {
    async create({ file, content, host, user, isPrivate }) {
        try {
            const post = await Post.create({
                author: user.user_id,
                image: `http://${host}/posts/images/${file.id}`,
                imageId: file.id,
                content,
                isPrivate
            })
            return post.toJSON()
        }
        catch (err) {
            console.error(err)
            throw new Error('Unable to create post. Please try again later!')
        }
    }

    async getAllPosts(page = 1, limit = 10) {
        try {
            const posts = await Post.paginate({}, { page, limit, customLabels })
            return posts
        }
        catch (err) {
            console.error(err)
            throw (new Error('Unable get posts. Please try again later!'))
        }
    }

    async getPostById(postId) {
        try { return await Post.findById(postId) } catch (err) {
            console.error(err)
            throw (new Error('Unable to get post. Please try again later!'))
        }
    }

    async getAllPublicPosts(page = 1, limit = 10) {
        try {
            const posts = await Post.paginate({ isPrivate: 'false' }, { page, limit, customLabels })
            return posts
        } catch (err) {
            console.error(err)
            throw (new Error('Unable to get public posts. Please try again later!'))
        }
    }
    async getAllUserPosts(page = 1, limit = 10, user) {
        try {
            const userId = user._id
            const posts = await Post.paginate({ author: userId }, { page, limit, customLabels })
            return posts
        } catch (err) {
            console.error(err)
            throw (new Error('Unable to get user posts. Please try again later!'))
        }
    }
    async removePost(postId, userId) {
        try {
            const post = await this.getPostById(postId)
            if (post && post.author === userId) {
                const removedPost = await Post.findOneAndRemove(postId)

                //removing associated image
                const imageId = removedPost && removedPost.imageId
                if (imageId) {
                    await imageService.removeImage(imageId)
                }

                //removing all associated comments
                await commentsService.removeByPost(postId)

                if (removedPost) {
                    return { removed: 1 }
                }
            }
            return { removed: 0 }
        } catch (err) {
            console.error(err)
            throw (new Error('Unable to remove post. Please try again later!'))
        }
    }
}

module.exports = new PostService()