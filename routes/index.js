const express = require('express');

const apiRouter = express.Router();
const userRoutes = require('./user')
const postsRoutes = require('./posts')
const commentRoutes = require('./comments')

apiRouter.use('/user', userRoutes)
apiRouter.use('/posts', postsRoutes)
apiRouter.use('/comments', commentRoutes)

module.exports = apiRouter;