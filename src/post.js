const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String
});

// const Post = mongoose.model('post', PostSchema)


module.exports = PostSchema;