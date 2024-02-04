const { Event } = require("../../models/calendar/eventsCalendar");

const findEventByType = async (req, res) => {
    const type = req.query.type;
    if (type !== "online" && type !== "offline" && type !== "hybrid") {
      return res.status(400).json({ message: "Invalid event type" });
    }
  
    try {
      let events = await Event.find({ type: type }).exec();
      res.status(200).send(events);
    } catch (err) {
      res.status(500).send(err);
    }
  };
  
  const findEventByCategory = async (req, res) => {
    const category = req.query.category;
    if (
      category !== "academic" &&
      category !== "club" &&
      category !== "placement" &&
      category !== "sports"
    ) {
      return res.status(400).json({ message: "Invalid event type" });
    }
  
    try {
      let events = await Event.find({ category: category }).exec();
      res.status(200).send(events);
    } catch (err) {
      res.status(500).send(err);
    }
  };
  
  const findEventsByTime = async (req, res) => {
    const { year, month, week, day } = req.query;
  
    const parsedYear = parseInt(year);
    const parsedMonth = parseInt(month);
    const parsedWeek = parseInt(week);
    const parsedDay = parseInt(day);
  
    if (
      isNaN(parsedYear) ||
      (parsedMonth && isNaN(parsedMonth)) ||
      parsedMonth < 1 ||
      parsedMonth > 12 ||
      (parsedWeek && isNaN(parsedWeek)) ||
      parsedWeek < 1 ||
      parsedWeek > 5 ||
      (parsedDay && isNaN(parsedDay)) ||
      parsedDay < 1 ||
      parsedDay > 31
    ) {
      return res.status(400).send({
        error:
          "Invalid year, month, week, or day parameter. Please provide valid values.",
      });
    }
  
    try {
      let start, end;
  
      if (parsedWeek) {
        start = new Date(parsedYear, parsedMonth - 1, 1 + (parsedWeek - 1) * 7);
        end = new Date(
          parsedYear,
          parsedMonth - 1,
          7 + (parsedWeek - 1) * 7,
          23,
          59,
          59,
          999
        );
      } else if (parsedDay) {
        start = new Date(parsedYear, parsedMonth - 1, parsedDay, 0, 0, 0, 0);
        end = new Date(parsedYear, parsedMonth - 1, parsedDay, 23, 59, 59, 999);
      } else {
        start = new Date(parsedYear, parsedMonth - 1, 1);
        end = new Date(parsedYear, parsedMonth, 0, 23, 59, 59, 999);
      }
  
      const events = await Event.find({
        startDateTime: { $gte: start, $lt: end },
      });
  
      res.status(200).send(events);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  // Delete event by user is already made in crud.js
  
  module.exports = {
    findEventByType,
    findEventByCategory,
    findEventsByTime,
  };