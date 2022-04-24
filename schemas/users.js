// schemas.js 
const Joi = require('joi')
module.exports = {
    create: Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
}
