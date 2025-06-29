const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');

// POST - Create Inquiry
router.post('/', async (req, res) => {
  const { userId, propertyId, message } = req.body;
  try {
    const inquiry = new Inquiry({ userId, propertyId, message });
    await inquiry.save();
    res.status(201).json(inquiry);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to create inquiry' });
  }
});

// GET - All Inquiries
router.get('/', async (req, res) => {router.post('/', authMiddleware, async (req, res) => {
  const { propertyId, message } = req.body;
  try {
    const inquiry = new Inquiry({
      propertyId,
      renterId: req.user.id,
      message,
    });
    await inquiry.save();
    res.status(201).json(inquiry);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create inquiry' });
  }
});

  try {
    const inquiries = await Inquiry.find().populate('userId').populate('propertyId');
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to fetch inquiries' });
  }
});

module.exports = router;
