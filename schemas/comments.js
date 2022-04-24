// schemas.js 
const Joi = require('joi')
module.exports = {
    create: Joi.object({
        commentText: Joi.string().required(),
        postId:Joi.string().required()

    }),
    get: Joi.object({
        postId: Joi.string().required()
    }),
    delete: Joi.object({
        commentId: Joi.string().required()
    })
}
