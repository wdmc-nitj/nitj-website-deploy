const { Event } = require("../../models/calendar/eventsCalendar");

const saveEvent = (req, res) => {
    const newEvent = req.body.eventObj;
    Event.create(newEvent)
        .then((createdEvent) => {
            res.status(200).send("Object Successfully created");
        })
        .catch((error) => {
            res.status(402).send(error);
        });
};

const showEvent = async (req, res) => {
    try {
        const eventData = await Event.find({}).exec();
        res.status(200).send(eventData);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateEvent = async (req, res) => {
    const id = req.params.id;
    const { fieldToUpdate, updatedValue } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid event ID" });
    }

    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { [fieldToUpdate]: updatedValue },
            { new: true }
        ).exec();
        res.status(200).send(updatedEvent);
    } catch (err) {
        res.status(504).send(err);
    }
};

const deleteEvent = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid event ID" });
    }

    try {
        const deletedEvent = await Event.findByIdAndDelete(id);
        res.status(200).send("Successfully deleted");
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    saveEvent,
    showEvent,
    updateEvent,
    deleteEvent,
};
