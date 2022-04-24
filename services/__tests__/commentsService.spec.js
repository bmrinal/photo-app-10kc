const CommentService = require('../commentsService')
const Comments = require('../../model/comments')

jest.mock('../../model/comments')

describe('Comment Service tests', () => {
   
    it('should create a comment successfully', async () => {
        await CommentService.create('comment text', 'postid', {
            email: "test@teststreet.com",
            user_id: "testId",
            authorName: "test",
            first_name: "first",
            last_name: "last"
        }),

            expect(Comments.create).toHaveBeenCalledTimes(1)
        expect(Comments.create).toHaveBeenCalledWith({
            "authorEmail": "test@teststreet.com",
            "authorId": "testId",
            "authorName": "first last",
            "commentText": "comment text",
            "postId": "postid"
        })
    })

    it('should throw an error if create fails', async () => {
        Comments.create.mockImplementationOnce(async() => {
            throw new Error("Unknown error occurred")
        })
        // lovely throws and exception testing with awaits!
        await expect(CommentService.create()).rejects.toThrow('Unknown error occurred')
    })
})