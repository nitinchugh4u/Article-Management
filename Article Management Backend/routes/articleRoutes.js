const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const { jwtAuthMiddleware } = require("../jwt");

// Create a new article (requires authentication)
router.post('/', jwtAuthMiddleware, async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all articles (public)
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Like an article (public)
router.post('/like/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    article.likes += 1;
    await article.save();
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an article (requires authentication)
router.put('/:id', jwtAuthMiddleware, async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an article (requires authentication)
router.delete('/:id', jwtAuthMiddleware, async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.status(200).json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
