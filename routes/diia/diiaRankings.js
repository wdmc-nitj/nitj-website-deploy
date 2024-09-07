const express = require('express');
const router = express.Router();
const DiiaRankings = require('../../models/diia/DiiaRankings');

// Get all DiiaRankings
router.get('/', async (req, res) => {
    try {
        const rankings = await DiiaRankings.find({disable:0}).sort({ order: 1 });
        res.json(rankings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
