const express = require('express');
const router = express.Router();
const DiiaHeroSlider = require('../../models/diia/DiiaHeroSlider');

// Get all DiiaHeroSlider items
router.get('/', async (req, res) => {
    try {
        const sliders = await DiiaHeroSlider.find({ disable: false }).sort({ order: 1 });
        res.json(sliders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
