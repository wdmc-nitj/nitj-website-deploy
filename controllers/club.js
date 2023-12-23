const Club = require("../models/club");

exports.addClub = async (req, res) => {
    if (req.body?.name === undefined) {
        return res.status(400).send("Error: Name is required");
    }

    const data = new Club({
        name: req.body?.name,
        desc: req.body?.desc,
        type: req.body?.type,
        img: req.body?.img,
        order: req.body?.order,
        new: req.body?.new,
        sourceOfInfo: {
            name: req.body?.sourceOfInfo?.name,
            email: req.body?.sourceOfInfo?.email,
            designation: req.body?.sourceOfInfo?.designation,
            department: req.body?.sourceOfInfo?.department,
        }
    });

    data.save()
        .then(() => res.status(201).send(data))
        .catch((err) => res.status(400).send("Error: " + err));
};

exports.getClub = async (req, res) => {
    if(req.query.id !== undefined){
        Club.find({ _id: req.params.id })
            .then((data) => res.status(200).send(data))
            .catch((err) => res.status(400).send("Error: " + err));
    }
    else{
        Club.find({ show: true })
            .then((data) => res.status(200).send(data))
            .catch((err) => res.status(400).send("Error: " + err));
    }
};


exports.updateClub = async (req, res) => {
    Club.findByIdAndUpdate(req.params.id,{
        name: req.body?.name,
        desc: req.body?.desc,
        type: req.body?.type,
        img: req.body?.img,
        order: req.body?.order,
        new: req.body?.new,
        sourceOfInfo: {
            name: req.body?.sourceOfInfo?.name,
            email: req.body?.sourceOfInfo?.email,
            designation: req.body?.sourceOfInfo?.designation,
            department: req.body?.sourceOfInfo?.department,
        }
        
    })
        .then(() => {
            res.status(200).send("Club updated successfully");
        })
        .catch((err) => res.status(400).send("Error: " + err));
};

exports.deleteClub = async (req, res) => {
    Club.findByIdAndUpdate(req.params.id, { $set: { show: false } })
        .then(() => {
            res.status(200).send("Club deleted successfully");
        })
        .catch((err) => res.status(400).send("Error: " + err));
};

exports.getAllClub = async (req, res) => {
    Club.find()
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).send("Error: " + err));
};
