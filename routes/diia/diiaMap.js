const express = require('express');
const router = express.Router();
const DiiaMap = require('../../models/diia/DiiaMap');

// Get all DiiaNewsSection items
router.get('/', async (req, res) => {
    try {
        const maps = await DiiaMap.find({disable:false});
        res.json(maps);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
