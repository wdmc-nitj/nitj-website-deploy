const express = require('express');
const router = express.Router();
const DiiaOpportunities = require('../../models/diia/DiiaOpportunities');

// Get all DiiaNewsSection items
router.get('/', async (req, res) => {
    try {
        const Opportunities = await DiiaOpportunities.find({disable:false}).sort({ order: 1 });
        res.json(Opportunities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
