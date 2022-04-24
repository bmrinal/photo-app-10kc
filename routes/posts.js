const express = require('express');
const postRoutes = express.Router();
const authorize = require("../middleware/auth");
const postController = require('../controllers/postController')
const { GridFsStorage } = require('multer-gridfs-storage');
const postSchema = require('../schemas/posts')
const validate = require('../middleware/payloadValidator')

const { MONGO_URI } = process.env;
const multer = require('multer');

const storage = new GridFsStorage({
    url: MONGO_URI,
    file: (req, file) => ({
        bucketName: 'photos',
        metadata: { isPrivate: req.body.isPrivate, ...file }
    })
});

const upload = multer({ storage })

//authenticated routes
postRoutes.post("/", authorize, upload.single('postPhoto'), postController.create); //create new posts with images
postRoutes.get("/my", authorize, postController.getUserPosts); //Get all posts with image URLs for signed in user
postRoutes.delete("/:postId?", validate(postSchema.delete, 'params'), authorize, postController.delete); //Remove specific post for the signed in user


//public routes
postRoutes.get("/images/:imageId", validate(postSchema.imageId,'params'), postController.streamImages)
postRoutes.get("/", postController.get); //Get all public posts for unauthenticated user and all posts for authenticated user


module.exports = postRoutes;