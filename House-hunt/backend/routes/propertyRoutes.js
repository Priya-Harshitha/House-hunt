const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save in uploads/ folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage: storage });


// ✅ GET all properties with optional filters
router.get('/', async (req, res) => {
  const { location, price, bedrooms } = req.query;
  let filter = {};

  if (location) {
    filter.location = { $regex: location, $options: 'i' };
  }
  if (price) {
    filter.price = { $lte: parseInt(price) };
  }
  if (bedrooms) {
    filter.bedrooms = parseInt(bedrooms);
  }

  try {
    const properties = await Property.find(filter);
    res.json(properties);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch filtered properties' });
  }
});


// ✅ FIRST: GET owner’s properties
router.get('/my', authMiddleware, async (req, res) => {
  console.log('Owner ID from token:', req.user.id);
  try {
    const properties = await Property.find({ ownerId: req.user.id });
    res.json(properties);
  } catch (err) {
    console.error('Error fetching owner properties:', err);
    res.status(500).json({ msg: 'Failed to fetch owner properties' });
  }
});

// ✅ THEN: GET property by ID
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching property' });
  }
});





// ✅ POST new property with file upload
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { title, description, location, price, bedrooms } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const property = new Property({
      title,
      description,
      location,
      price,
      bedrooms,
      image,
      ownerId: req.user.id
    });

    await property.save();
    res.status(201).json(property);
  } catch (err) {
    console.error("Error adding property:", err); // ⬅ log the real error
    res.status(500).json({ msg: 'Failed to add property', error: err.message });
  }
});

// ✅ DELETE a property
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({
      _id: req.params.id,
      ownerId: req.user.id
    });
    if (!property) return res.status(404).json({ message: 'Property not found or unauthorized' });
    res.json({ message: 'Property deleted' });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: 'Failed to delete property' });
  }
});

// ✅ PUT - Update property by ID
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, description, location, price, bedrooms } = req.body;

    const updated = await Property.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user.id },
      { title, description, location, price, bedrooms },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Property not found or unauthorized' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Update failed:', err.message);
    res.status(500).json({ message: 'Failed to update property', error: err.message });
  }
});





module.exports = router;
