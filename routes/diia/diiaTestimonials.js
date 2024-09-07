const express = require('express');
const router = express.Router();
const DiiaTestimonials = require('../../models/diia/DiiaTestimonials');

// Get all DiiaTestimonials
router.get('/', async (req, res) => {
    try {
        const testimonials = await DiiaTestimonials.find({disable:false}).sort({ order: 1 });
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
