const ProctorialCell = require("../models/proctorialCell");

exports.addProctorialCell = async (req, res) => {
    const data = new ProctorialCell(req.body);

    data.save()
        .then(() => res.status(201).json(data))
        .catch((err) => res.status(400).json("Error: " + err));
};

exports.getProctorialCell = async (req, res) => {
    ProctorialCell.find({ show: true })
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).json("Error: " + err));
};

exports.getProctorialCellbyId = async (req, res) => {
    ProctorialCell.findById(req.params.id)
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).json("Error: " + err));
};

exports.updateProctorialCell = async (req, res) => {
    ProctorialCell.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => res.status(400).json("Error: " + err));
};

exports.deleteProctorialCell = async (req, res) => {
    ProctorialCell.findByIdAndUpdate(req.params.id, { $set: { show: false } })
        .then(() => {
            res.status(200).send("ProctorialCell deleted successfully");
        })
        .catch((err) => res.status(400).json("Error: " + err));
};

exports.getAllProctorialCell = async (req, res) => {
    ProctorialCell.find()
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).json("Error: " + err));
};
