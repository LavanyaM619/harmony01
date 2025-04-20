const express = require('express');
const router = express.Router();
const Root = require('../models/Root');

// CREATE a new Root
router.post('/', async (req, res) => {
  try {
    const newRoot = new Root(req.body);
    const savedRoot = await newRoot.save();
    res.status(201).json(savedRoot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all Roots
router.get('/', async (req, res) => {
  try {
    const roots = await Root.find();
    res.status(200).json(roots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ a single Root by ID
router.get('/:id', async (req, res) => {
  try {
    const root = await Root.findById(req.params.id);
    if (!root) return res.status(404).json({ message: 'Root not found' });
    res.status(200).json(root);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a Root by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedRoot = await Root.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedRoot) return res.status(404).json({ message: 'Root not found' });
    res.status(200).json(updatedRoot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a Root by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedRoot = await Root.findByIdAndDelete(req.params.id);
    if (!deletedRoot) return res.status(404).json({ message: 'Root not found' });
    res.status(200).json({ message: 'Root deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
