const tokenService = require('../services/tokenService')
module.exports = (req, res, next) => {
    const token = tokenService.getToken(req)
    if (token) {
        req.token = token
        const user = tokenService.verifyToken(token)
        if (user) {
            req.user = user
        }
    }
    return next()
}