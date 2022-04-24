// schemas.js 
const Joi = require('joi')
module.exports = {
    //we will validate it post upload in the controller as JOI can't handle multipart form components (allowing any to pass through)
    create: Joi.object({
        content: Joi.any(),
        isPrivate: Joi.any(),
        postPhoto: Joi.any(),
    }),

    delete: Joi.object({
        postId: Joi.string().required()
    }),

    imageId: Joi.object({
        imageId: Joi.string().required()
    })
}
