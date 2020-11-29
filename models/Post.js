const mongoose = require("mongoose");
const config = require("dotenv").config();

const PostSchema = mongoose.Schema({
  postId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    required: false,
  },
  lastModified: {
    type: Number,
    required: false,
  },
  slug: {
    type: String,
    required: false,
    unique: true
  },
});

module.exports = mongoose.model(process.env.POSTS_COLLECTION, PostSchema);
