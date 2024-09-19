const express = require('express');
const router = express.Router();
const DiiaNavBar = require('../../models/diia/DiiaNavBar');

// Get all navbar items
router.get('/', async (req, res) => {
    try {
        const navbarItems = await DiiaNavBar.find({ show: true }).sort({ order: 1 });
        res.json(navbarItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
