const mongoose = require("mongoose");
const outputSanitizer = require('../mongoosePlugins/outputSanitizer')
const mongoosePaginate = require('mongoose-paginate-v2');


mongoose.plugin(outputSanitizer);

const postSchema = new mongoose.Schema({
  author: { type: String },
  image: { type: String },
  imageId: { type: String },
  content: { type: String },
  isPrivate: { type: Boolean }
},
  {
    timestamps: true
  }
);

postSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("posts", postSchema);