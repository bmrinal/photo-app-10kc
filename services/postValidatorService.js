class PostValidatorService {
    validate(postData) {
        //better checks can be performed using dedicated file modules like "file-type" etc but the below should suffice for the assignment
        const whitelist = [
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/webp'
        ]
        const { file, content, isPrivate } = postData
        
        return !!(file &&
            isPrivate !== undefined &&
            content &&
            whitelist.includes(file.mimetype)) //trivial validations here. JOI can't handle multipart form data.
      
    }
}
module.exports = new PostValidatorService()