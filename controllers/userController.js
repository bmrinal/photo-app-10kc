//services
const tokenService = require('../services/tokenService');
const userService = require('../services/userService')

class UserController {
    async register(req, res) {
        try {
            // check if user already exist
            // Validate if user exist in our database
            const oldUser = await userService.getUser(req.body);
            if (oldUser) {
                return res.status(409).send({ error: "User Already Exist. Please Login" });
            }

            const newUser = await userService.createUser(req.body)
            const userWithToken = userService.attachTokenToUser(newUser)

            // return new user
            res.status(201).json(userWithToken);
        }
        catch (err) {
            console.error(err);
        }

    }

    async login(req, res) {
        try {
            const validUser = await userService.getUser(req.body);
            if (validUser) {
                // Create token
                const token = tokenService.generateToken(validUser)

                // attach user token
                validUser.token = token;

                // user
                res.status(200).json(validUser);
            }
            else {
                res.status(400).send({ error: "Invalid Credentials" });
            }

        } catch (err) {
            console.error(err);
        }
    }

    async logout(req, res) {
        // invalidate JWTs -  different approaches available but maintaining a blacklist of invalid tokens in a fast in-memory
        // DB (REDIS) with self expiring keys should be a neat approach. Omitting the implementation at this point to limit the
        // scope of this assignment
    }
}



module.exports = new UserController()