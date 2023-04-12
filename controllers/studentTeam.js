const StudentTeam = require("../models/studentTeam");

exports.addStudentTeam = async (req, res) => {
    const data = new StudentTeam(req.body);

    data.save()
        .then(() => res.status(201).json(data))
        .catch((err) => res.status(400).json("Error: " + err));
};

exports.getStudentTeam = async (req, res) => {
    StudentTeam.find({ show: true })
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).json("Error: " + err));
};

exports.getStudentTeambyId = async (req, res) => {
    StudentTeam.findById(req.params.id)
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).json("Error: " + err));
};

exports.updateStudentTeam = async (req, res) => {
    StudentTeam.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => res.status(400).json("Error: " + err));
};

exports.deleteStudentTeam = async (req, res) => {
    StudentTeam.findByIdAndUpdate(req.params.id, { $set: { show: false } })
        .then(() => {
            res.status(200).send("StudentTeam deleted successfully");
        })
        .catch((err) => res.status(400).json("Error: " + err));
};

exports.getAllStudentTeam = async (req, res) => {
    StudentTeam.find()
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).json("Error: " + err));
};
