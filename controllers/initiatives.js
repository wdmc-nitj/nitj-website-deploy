const Initiatives = require("../models/initiatives");
const {sendError} = require('../utils');
//----------------------------------->

//----------------------------------------------------------------------->
exports.addInitiative = async (req, res) => {
    if (req.body?.title === undefined) {
        return res.status(400).send("Error: Title is required");
    }

    const initiative = new Initiatives({
        title: req.body?.title,
        desc: req.body?.desc,
        sourceOfInfo: {
            name: req.body?.sourceOfInfoName,
            email: req.body?.sourceOfInfoEmail,
            designation: req.body?.sourceOfInfoDesignation,
            department: req.body?.sourceOfInfoDepartment,
        },
        order: req.body?.order,
        new: req.body?.new,
    });

    initiative
        .save()
        .then((initiative) => res.status(200).send("initiative added successfully"))
        .catch((err) => res.status(400).send("Error: " + err));
};

exports.getInitiative = async (req, res) => {
    if (req.query.id !== undefined) {
        Initiatives.find({ _id: req.query.id })
            .then((initiative) => res.status(200).send(initiative))
            .catch((err) => res.status(400).send("Error: " + err));
    } else if (req.query.title !== undefined) {
        const title = req.query.title.split("-").join(" ");
        return Initiatives.find({ title: title })
            .then((initiative) => res.status(200).send(initiative))
            .catch((err) => res.status(400).send("Error: " + err));
    } else {
        
        Initiatives.find({ show: true })
            .then((initiative) => {res.status(200).send(initiative)})
            .catch((err) => res.status(400).send("Error: " + err));
    }
};

exports.updateInitiative = async (req, res) => {
    Initiatives.findByIdAndUpdate(req.params.id, {
        title: req.body?.title,
        desc: req.body?.desc,
        sourceOfInfo: {
            name: req.body?.sourceOfInfo?.name,
            email: req.body?.sourceOfInfo?.email,
            designation: req.body?.sourceOfInfo?.designation,
            department: req.body?.sourceOfInfo?.department,
        },
        order: req.body?.order,
        new: req.body?.new,
    })
        .then(() => {
            res.status(200).send("Initiative updated successfully");
        })
        .catch((err) => res.status(400).send("Error: " + err));
};

exports.deleteInitiative = async (req, res) => {
    Initiatives.findByIdAndUpdate(req.params.id, { $set: { show: false } })
        .then(() => {
            res.status(200).send("Initiative deleted successfully");
        })
        .catch((err) => res.status(400).send("Error: " + err));
};

exports.getAllInitiative = async (req, res) => {
    Initiatives.find({})
        .then((initiative) => res.status(200).send(initiative))
        .catch((err) => res.status(400).send("Error: " + err));
};


exports.getInitiativebyType = (req, res) => {
    let filter = { show : true };

    if (req.query.type !== 'all') {
        filter.type = req.query.type;
    }

    Initiatives
        .find(filter)
        .sort({ morder: 1 })
        .then((intiative) => res.json(intiative))
        .catch((err) => sendError(res,err));
};
