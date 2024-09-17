const express = require('express');
const router = express.Router();
const DiiaNumber = require('../../models/diia/DiiaNumber');

// Get all DiiaNumber items
router.get('/', async (req, res) => {
    try {
        const numbers = await DiiaNumber.find().sort({order : 1});
        res.json(numbers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
