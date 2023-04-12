const UpcomingEvent = require("../models/upcomingEvent");
//----------------------------------->

//----------------------------------------------------------------------->
exports.addUpcomingEvent = async (req, res) => {
    if(req.body?.title===undefined || req.body?.date===undefined){
        return res.status(400).json("Error: Title and Date are required");
    }

    const data = new UpcomingEvent({
        title: req.body?.title,
        date: req.body?.date,
        link: req.body?.link,
        order: req.body?.order,
        img: req.body?.img,
        new: req.body?.new,
        sourceOfInfo: {
            name: req.body?.sourceOfInfo?.name,
            email: req.body?.sourceOfInfo?.email,
            designation: req.body?.sourceOfInfo?.designation,
            department: req.body?.sourceOfInfo?.department,
        },

    });

    data.save()
        .then(() => res.status(200).json(data))
        .catch((err) => res.status(400).json("Error: " + err));
};

//----------------------------------------------------------------------->
exports.getUpcomingEvent = async (req, res) => {
    if (req.query.id!==undefined) {
        UpcomingEvent.find({ _id: req.query.id })
            .then((cal) => res.status(200).json(cal))
            .catch((err) => res.status(404).json("Error: " + err));
       
    } else {
        UpcomingEvent.find({ show: true })
            .then((cal) => res.status(200).json(cal))
            .catch((err) => res.status(404).json("Error: " + err));
    }
};


exports.getAllUpcomingEvent = async (req, res) => {
    UpcomingEvent.find({})
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(404).json("Error: " + err));
};

//----------------------------------------------------------------------->
exports.updateUpcomingEvent = async (req, res) => {
    UpcomingEvent.findByIdAndUpdate(req.params.id,{
        $set: {
            title: req.body?.title,
            date: req.body?.date,
            link: req.body?.link,
            order: req.body?.order,
            img: req.body?.img,
            new: req.body?.new,
            sourceOfInfo: {
                name: req.body?.sourceOfInfo?.name,
                email: req.body?.sourceOfInfo?.email,
                designation: req.body?.sourceOfInfo?.designation,
                department: req.body?.sourceOfInfo?.department,
            },
        },
        
    })
        .then(() => res.status(200).json("Event Updated Successfully!"))
        .catch((err) => res.status(404).json("Error: " + err));
};

//----------------------------------------------------------------------->
exports.deleteUpcomingEvent = async (req, res) => {
    UpcomingEvent.findByIdAndUpdate(req.params._id, {
        $set: { show: false },
    })
        .then(() => res.status(200).json("Event deleted successfully!"))
        .catch((err) => res.status(404).json("Error: " + err));
};
