const express = require('express');
const router = express.Router();
const DiiaDeandetails = require('../../models/diia/DiiaDeandetails');

// Get all DiiaDeandetails items
router.get('/', async (req, res) => {
    try {
        const dean_details = await DiiaDeandetails.find({ disable: false });
        res.json(dean_details);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
