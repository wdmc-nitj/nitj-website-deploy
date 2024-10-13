const express = require('express');
const router = express.Router();
const DiiaGallery = require('../../models/diia/DiiaGallery');

// Get all DiiaGallery items
router.get('/', async (req, res) => {
    try {
        const gallery = await DiiaGallery.find();
        res.json(gallery);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
