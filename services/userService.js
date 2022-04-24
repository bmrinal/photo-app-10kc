const User = require("../model/user");
const bcrypt = require('bcrypt');
const tokenService = require('./tokenService')

class UserService {
    async getUser(inputUser) {
        try {
            const { email, password } = inputUser
            const user = await User.findOne({ email });
            if (user && (await bcrypt.compare(password, user.password))) {
                return user;
            }
            return false;
        } catch (err) {
            console.error(err)
            throw (new Error('Unable to get user at this point, please try again later'))
        }
    }

    async createUser(userData) {
        try {
            const { first_name, last_name, email, password } = userData
            const encryptedPassword = await bcrypt.hash(password, 10);

            // Create user in our database
            const newUser = await User.create({
                first_name,
                last_name,
                email: email.toLowerCase(), // sanitize: convert email to lowercase
                password: encryptedPassword,
            });
            return newUser.toJSON()
        } catch (err) {
            console.error(err)
            throw (new Error('Unable to create user at this point, please try again later'))
        }
    }

    attachTokenToUser(user) {
        const updatedUser = { ...user }
        const token = tokenService.generateToken(user)
        updatedUser.token = token
        return updatedUser
    }

}

module.exports = new UserService()