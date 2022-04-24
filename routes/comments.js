const express = require('express')
const commentsRoutes = express.Router()
const authorize = require("../middleware/auth")
const validate = require('../middleware/payloadValidator')
const commentSchema = require('../schemas/comments')
const commentsController = require('../controllers/commentsController')

// assumes anyone can comment on posts
// can be restricted if needed to only public posts (but kind of obscure as private posts aren't visible to unauthenticated users)

commentsRoutes.post("/", validate(commentSchema.create), commentsController.add);
commentsRoutes.get("/:postId", validate(commentSchema.get, 'params'), commentsController.get);


// can only be deleted if the user is authorized and the comment belongs to that user - note the middleware dancing in between :P
// no mechanism (in this scope) to remove anonymous comments
commentsRoutes.delete("/:commentId", validate(commentSchema.delete, 'params'), authorize, commentsController.remove);

module.exports = commentsRoutes;