const express = require('express');
const router = express.Router();
const DiiaMous = require('../../models/diia/DiiaMous');

// Get all DiiaMous items
router.get('/', async (req, res) => {
    try {
        const mous = await DiiaMous.find({ disable: 0 }).sort({ sliderOrder: 1 });
        res.json(mous);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
