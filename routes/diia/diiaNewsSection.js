const express = require("express");
const router = express.Router();
const DiiaNewsSection = require("../../models/diia/DiiaNewsSection");

// Get all DiiaNewsSection items
router.get("/", async (req, res) => {
  try {
    const newsSections = await DiiaNewsSection.find({ disable: false }).sort({
      order: 1,
    });
    res.json(newsSections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
