const jwt = require('jsonwebtoken');
class TokenService {
    generateToken(user) {
        try {
            const { email, first_name, last_name } = user
            const token = jwt.sign(
                { user_id: user._id, email, first_name, last_name },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            return token
        }
        catch (err) {
            console.error(err)
            throw (new Error({ error: 'auth failed' }))
        }
    }

    getToken(req) {
        return req.body.token || req.query.token || req.headers["x-access-token"]
    }

    verifyToken(token) {
        if (!token) {
            return false
        }
        try {
            const decodedUser = jwt.verify(token, process.env.TOKEN_KEY);
            return decodedUser
        } catch (err) {
            console.error(err)
            return false
        }
    }
}
module.exports = new TokenService()