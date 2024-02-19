const Event= require("../../models/calendar/eventsCalendar");

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
//previous showEvent Function
// const showEvent = async (req, res) => {
//     try {
//         const eventData = await Event.find({}).exec();
//         res.status(200).send(eventData);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error);
//     }
// };


//new showEvent Function , write url in this format to get the monthly data: http://localhost:8000/api/eventsCalendar/events?year=2024&month=5
const showEvent = async (req, res) => {
    try {
        const { year, month } = req.query;
        
        const parsedYear = parseInt(year);
        const parsedMonth = parseInt(month);

        if (
            isNaN(parsedYear) ||
            isNaN(parsedMonth) ||
            parsedMonth < 1 ||
            parsedMonth > 12
        ) {
            return res.status(400).json({ message: "Invalid year or month parameter" });
        }

        const startOfMonth = new Date()
        startOfMonth.setFullYear(parsedYear)
        startOfMonth.setMonth(parsedMonth-1)
        startOfMonth.setDate(1)
        startOfMonth.setUTCHours(0,0,0,0)

        const endOfMonth = new Date()
        
        if(parsedMonth===12){
            parsedYear=parsedYear+1
            parsedMonth=0
        }

        endOfMonth.setFullYear(parsedYear)
        endOfMonth.setMonth(parsedMonth)
        endOfMonth.setDate(1)
        endOfMonth.setUTCHours(0,0,0,0)

        const eventData = await Event.find({
            startDateTime: { $gte: startOfMonth, $lte: endOfMonth }
        }).exec();

        res.status(200).send(eventData);
    } catch (error) {
        console.log(error);
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
