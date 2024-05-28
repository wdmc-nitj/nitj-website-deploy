const Publication = require("../models/publication");
//----------------------------------->

//----------------------------------------------------------------------->
exports.addPublication = async (req, res) => {
    const data = new Publication(req.body);

    data.save()
        .then(() => res.status(200).send(data))
        .catch((err) => res.status(400).json("Error: " + err));
};

exports.showPublication = async (req, res) => {
    if (req.query.id) {
        Publication.find({ _id: req.query.id })
            .then((data) => res.status(200).send(data))
            .catch((err) => res.status(400).json("Error: " + err));
    } else {
        Publication.find({ show: true })
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(400).json("Error: " + err));
    }
};

exports.showPublicationbyId = async (req, res) => {
    Publication.findById(req.params.id)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json("Error: " + err));
};

exports.updatePublication = async (req, res) => {
    Publication.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.status(200).send("Publication updated successfully");
        })
        .catch((err) => res.status(400).json("Error: " + err));
};

exports.deletePublication = async (req, res) => {
    Publication.findByIdAndUpdate(req.params.id, { $set: { show: false } })
        .then(() => {
            res.status(200).send("Publication deleted successfully");
        })
        .catch((err) => res.status(400).json("Error: " + err));
};

exports.showAllPublication = async (req, res) => {
    Publication.find()
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).json("Error: " + err));
};
