const LatestEvent = require("../models/latestEvent");

exports.addLatestEvent = async (req, res) => {
    if(req.body?.title === undefined){
        return res.status(400).send("Error: Title is required");
    }

    const latestEvent = new LatestEvent({
        title: req.body?.title,
        desc: req.body?.desc,
        image: req.body?.image,
        sourceOfInfo: {
            name: req.body?.sourceOfInfo?.name,
            email: req.body?.sourceOfInfo?.email,
            designation: req.body?.sourceOfInfo?.designation,
            department: req.body?.sourceOfInfo?.department,
        },
        order: req.body?.order,
        new: req.body?.new,
    });

    latestEvent
        .save()
        .then(() => res.status(200).send(latestEvent))
        .catch((err) => res.status(400).send("Error: " + err));
};

//----------------------------------------------------------------------->
exports.getLatestEvent = async (req, res) => {
    if (req.query.id !== undefined) {
        LatestEvent.find({ _id: req.query.id })
            .then((cal) => res.status(200).send(cal))
            .catch((err) => res.status(404).send("Error: " + err));
    } 
    else if(req.query.title !== undefined){
        LatestEvent.find({ title: req.query.title })
            .then((cal) => res.status(200).send(cal))
            .catch((err) => res.status(404).send("Error: " + err));
    }
    else {
        
        LatestEvent.find({ show: true })
            .then((cal) => res.status(200).send(cal))
            .catch((err) => res.status(404).send("Error: " + err));
    }
};

exports.getAllLatestEvent = async (req, res) => {
    LatestEvent.find({})
        .then((result) => res.status(200).send(result))
        .catch((err) => res.status(404).send("Error: " + err));
};



//----------------------------------------------------------------------->
exports.updateLatestEvent = async (req, res) => {
    LatestEvent.findByIdAndUpdate(req.params.id,{
        title: req.body?.title,
        desc: req.body?.desc,
        image: req.body?.image,
        sourceOfInfo: {
            name: req.body?.sourceOfInfo?.name,
            email: req.body?.sourceOfInfo?.email,
            designation: req.body?.sourceOfInfo?.designation,
            department: req.body?.sourceOfInfo?.department,
        },
        order: req.body?.order,
    })
        .then(() => res.status(200).send("Event Updated Successfully!"))
        .catch((err) => res.status(404).send("Error: " + err));
};

//----------------------------------------------------------------------->
exports.deleteLatestEvent = async (req, res) => {
    LatestEvent.findByIdAndUpdate(req.params._id, {
        $set: { show: false },
    })
        .then(() => res.status(200).send("Event deleted successfully!"))
        .catch((err) => res.status(404).send("Error: " + err));
};
