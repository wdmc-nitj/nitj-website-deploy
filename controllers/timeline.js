const Timeline = require("../models/timeline");
//----------------------------------->

//----------------------------------------------------------------------->
exports.addTimeline = async (req, res) => {
    const data = new Timeline({
        Timeline: req.body.Timeline,
        sourceOfInfo: req.body.sourceOfInfo,
    });

    data.save()
        .then(() => res.status(200).send(data))
        .catch((err) => res.status(400).json("Error: " + err));
};

exports.showTimeline = async (req, res) => {
    Timeline.find({ show: true })
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json("Error: " + err));
};

exports.showTimelinebyId = async (req, res) => {
    Timeline.findById(req.params.id)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json("Error: " + err));
};

exports.updateTimeline = async (req, res) => {
    Timeline.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.status(200).send("Timeline updated successfully");
        })
        .catch((err) => res.status(400).json("Error: " + err));
};

exports.deleteTimeline = async (req, res) => {
    Timeline.findByIdAndUpdate(req.params.id, { $set: { show: false } })
        .then(() => {
            res.status(200).send("Timeline deleted successfully");
        })
        .catch((err) => res.status(400).json("Error: " + err));
};

exports.showAllTimeline = async (req, res) => {
    Timeline.find({})
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).json("Error: " + err));
};
