const express = require('express');
const router = express.Router();
const DiiaFooter = require('../../models/diia/DiiaFooter');

// Get all DiiaFooter items
router.get('/', async (req, res) => {
    try {
        const footer = await DiiaFooter.find().sort({order : 1});
        res.json(footer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
