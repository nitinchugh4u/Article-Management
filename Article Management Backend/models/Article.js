const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  video: { type: String },
  description: { type: String },
  publishDate: { type: Date, default: Date.now },
  text: { type: String },
  likes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Article', ArticleSchema);
