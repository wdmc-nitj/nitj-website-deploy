const express = require('express');
const router = express.Router();
const DiiaColorButton = require('../../models/diia/DiiaColorButton');

// Get all DiiaColorButton items
router.get('/', async (req, res) => {
    try {
        const button = await DiiaColorButton.find().sort({order : 1});
        res.json(button);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
