const mongoose = require('mongoose')

class ImageService {
    getImageBucket() {
        try {
            return new mongoose.mongo.GridFSBucket(mongoose.connection.client.db('photoApp'), {
                bucketName: 'photos'
            });    
        }
        catch(err)
        {
            console.error(err)
            throw( new Error('Unable to establish storage with database'))
        }
        
    }

    async getImage(imageId) {
        try {
            const bucket = this.getImageBucket()
            const readStream = await bucket.openDownloadStream(mongoose.Types.ObjectId(imageId))
            return readStream    
        }
        catch(err)
        {
            console.error(err)
            throw( new Error('Unable to establish storage with database'))
        }
        
    }

    async removeImage(imageId) {
        try {
            const bucket = this.getImageBucket()
            return bucket.delete(mongoose.Types.ObjectId(imageId))    
        }
        catch(err)
        {
            console.error(err)
            throw( new Error('Unable to establish storage with database'))
        }
    }

    async isPrivate(imageId) {
        const bucket = this.getImageBucket()
        const fileData = await bucket.find({ _id: mongoose.Types.ObjectId(imageId) }).toArray()

        if (fileData && fileData.length) {
            const { metadata: { isPrivate } } = fileData[0]
            return isPrivate
        }
    }
}

module.exports = new ImageService()