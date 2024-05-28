const ResearchHighlights = require("../models/researchHighlights");
//----------------------------------->

//----------------------------------------------------------------------->
exports.addResearchHighlights = async (req, res) => {
    if (req.body?.title === undefined || req.body?.type === undefined) {
        return res.status(400).send("Error: Title and Type are required");
    }

    const researchHighlights = new ResearchHighlights({
        title: req.body?.title,
        type: req.body?.type,
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

    researchHighlights
        .save()
        .then(() => res.status(200).send(researchHighlights))
        .catch((err) => res.status(400).send("Something Wrong Happened"));
};

exports.updateResearchHighlights = async (req, res) => {
    ResearchHighlights.findByIdAndUpdate(req.params.id, {
        title: req.body?.title,
        type: req.body?.type,
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
    })
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).send(err));
};

exports.deleteResearchHighlights = async (req, res) => {
    ResearchHighlights.findByIdAndUpdate(req.params.id, { $set: { show: false } })
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).send(err));
};

exports.showAllResearchHighlights = async (req, res) => {
    ResearchHighlights.find({})
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).send("Something Wrong Happened"));
};

exports.showResearchHighlights = async (req, res) => {
    if (req.query.id !== undefined) {
        ResearchHighlights.find({ _id: req.query.id })
            .then((data) => res.status(200).send(data))
            .catch((err) => res.status(400).send("Something Wrong Happened"));
    } else {
        ResearchHighlights.find({ show: true })
            .then((data) => res.status(200).send(data))
            .catch((err) => res.status(400).send("Something Wrong Happened"));
    }
};

//comment
