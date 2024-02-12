const express = require("express");

const {
    saveEvent,
    showEvent,
    updateEvent,
    deleteEvent,
} = require("../../controllers/calendar/eventCrud.js");

const {  
  findEventByType,
  findEventByCategory,
  findEventsByTime
} = require("../../controllers/calendar/eventCategory.js")

// Router 
const router = express.Router();

router.post('/events', saveEvent);
router.get('/events', showEvent);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

router.get('/findByType', findEventByType);
router.get('/findeventByCategory', findEventByCategory);
router.get('/findeventsByTime', findEventsByTime);

module.exports = router;