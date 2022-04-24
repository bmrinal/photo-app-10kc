const CommentsController = require('../commentsController')
const commentsService = require('../../services/commentsService')


jest.mock('../../services/commentsService')

describe('Comment controller tests', () => {
    it('should create the comment correctly', async () => {
        const req = {
            user: { name: "juliet" },
            body: {
                commentText: "foo",
                postId: "bar"
            }
        }
        
        // MOCKING SERVICES
        commentsService.create.mockResolvedValueOnce({ commentText: "Hello sunshine!" })
        
        const res = { json: jest.fn() }
        await CommentsController.add(req, res)
        expect(commentsService.create).toHaveBeenCalledWith("foo", "bar", { name: 'juliet' })
        expect(res.json).toHaveBeenCalledWith({ commentText: "Hello sunshine!" })
        expect(commentsService.create).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledTimes(1)
    })
})