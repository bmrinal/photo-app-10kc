# Welcome to Photo posts app!

Hi! I'm your (kinda) blog posts application that has capabilities like the below 
- **Add new posts**  : Post consists of text, image and isPrivate flag
- **Remove posts**
- **Create New Users**
- **Login with users and getting tokens**
- **Commenting publicly or privately**

# Setup and running locally

Clone the repo

    git clone https://github.com/bmrinal/photo-app-10kc.git
    cd photo-app-10kc

Installing Dependencies

    npm i
Running Locally

    npm run dev 
Stop dev

    npm run stop:dev

## Running Tests

To run the tests

    npm run test
To run in watch mode

    npm run test:watch

## Testing API with postman

For convenience, this repository has a fully working postman collection included. Please import  this [Postman collection](https://github.com/bmrinal/photo-app-10kc/blob/main/Photo%20App%20Mrinal.postman_collection.json)

Many routes are authorized, so need frequent updating of tokens. Authentication token can be supplied under header `x-access-token` key.

## Available Routes

### Users
- Create a new user (POST): /user/register
	- email (required)
	- password (required)
	- first_name (required)
	- last_name (required)
- Login as a user (POST): /user/login
	- email (required)
	- password (required)

Once logged in, you will receive a token that needs to be used by all authenticated routes

### Posts
- Create a new user (POST): /posts
	- content (required)
	- isPrivate (required)
	- postPhoto (required)
- Get all posts  (GET): /posts/
	-  if `x-access-token` is supplied in headers, will get all the posts (publc & private)
	- If no token supplied, will return only the public posts
- Get MY posts - all posts by the *signedin user* (GET): /posts/my (token required)
- Delete a post - Delete post by Id (DELETE) : /post/:postId


### Comments
- Create a new comment (POST): /comment
	- commentText (required)
	- postId (required)
- Get comments for a post  (GET): /comment/:postId
- Delete a single comment (DELETE): /comment/:commentId

# Technical Notes

-	Uses JOI for validating input payloads
-	Jest is used for running tests

