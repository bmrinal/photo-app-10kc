const express = require('express');
const userRoutes = express.Router();
const payloadValidator = require('../middleware/payloadValidator')
const userSchema = require('../schemas/users')
const userController = require('../controllers/userController')

userRoutes.post("/register", payloadValidator(userSchema.create), userController.register);
userRoutes.post("/login", payloadValidator(userSchema.login), userController.login);

module.exports = userRoutes;