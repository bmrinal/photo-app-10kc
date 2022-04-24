const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const commentSchema = new mongoose.Schema(
  {
    postId: { type: String },
    authorName: { type: String },
    authorId: { type: String},
    authorEmail: { type: String },
    commentText: { type: String },
    postedOn: { type: Date }
  },
  {
    timestamps: true
  });

commentSchema.plugin(mongoosePaginate)
module.exports = mongoose.model("comments", commentSchema);