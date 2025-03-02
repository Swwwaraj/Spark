import express from 'express';
import Link from '../models/Link.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET api/links
// @desc    Get all links for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ user: req.user.id }).sort({ order: 1 });
    res.json(links);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/links
// @desc    Create a link
// @access  Private
router.post('/', auth, async (req, res) => {
  const { title, url } = req.body;
  
  try {
    // Get the highest order value
    const lastLink = await Link.findOne({ user: req.user.id }).sort({ order: -1 });
    const order = lastLink ? lastLink.order + 1 : 0;
    
    const newLink = new Link({
      title,
      url,
      user: req.user.id,
      order
    });
    
    const link = await newLink.save();
    res.json(link);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/links/:id
// @desc    Update a link
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, url, active, order } = req.body;
  
  // Build link object
  const linkFields = {};
  if (title !== undefined) linkFields.title = title;
  if (url !== undefined) linkFields.url = url;
  if (active !== undefined) linkFields.active = active;
  if (order !== undefined) linkFields.order = order;
  
  try {
    let link = await Link.findById(req.params.id);
    
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }
    
    // Check user
    if (link.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Update link
    link = await Link.findByIdAndUpdate(
      req.params.id,
      { $set: linkFields },
      { new: true }
    );
    
    res.json(link);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/links/:id
// @desc    Delete a link
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }
    
    // Check user
    if (link.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    await link.deleteOne();
    
    res.json({ message: 'Link removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/links/reorder
// @desc    Reorder links
// @access  Private
router.put('/reorder', auth, async (req, res) => {
  const { links } = req.body;
  
  try {
    // Update each link's order
    const updatePromises = links.map(async (link) => {
      return Link.findByIdAndUpdate(
        link._id,
        { $set: { order: link.order } },
        { new: true }
      );
    });
    
    await Promise.all(updatePromises);
    
    const updatedLinks = await Link.find({ user: req.user.id }).sort({ order: 1 });
    res.json(updatedLinks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;