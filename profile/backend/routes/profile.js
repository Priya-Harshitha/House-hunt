const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// GET profile
router.get('/', async (req, res) => {
  const profile = await Profile.findOne(); // Get one profile
  res.json(profile);
});

// PUT update profile
router.put('/', async (req, res) => {
  const existing = await Profile.findOne();
  if (existing) {
    existing.set(req.body);
    await existing.save();
    res.json({ message: 'Updated', profile: existing });
  } else {
    const newProfile = new Profile(req.body);
    await newProfile.save();
    res.json({ message: 'Created', profile: newProfile });
  }
});

module.exports = router;
