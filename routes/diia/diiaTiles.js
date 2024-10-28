const express = require('express');
const router = express.Router();
const DiiaTiles = require('../../models/diia/DiiaTiles');

// Get all DiiaTiles
router.get('/', async (req, res) => {
    try {
        const tiles = await DiiaTiles.find({show:true}).sort({ order: 1 });
        res.json(tiles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
