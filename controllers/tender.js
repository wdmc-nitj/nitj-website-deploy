const Tender = require("../models/tender");
//----------------------------------->

//----------------------------------------------------------------------->
exports.addTender = async (req, res) => {
  const data = new Tender(req.body);

  data
    .save()
    .then(() => res.status(200).send(data))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.showTender = async (req, res) => {
  Tender.find({ show: true })
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.showTenderbyId = async (req, res) => {
  if (req.query.id) {
    Tender.find({_id:req.query.id})
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    Tender.find({ show: true })
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(400).json("Error: " + err));
  }
};

exports.updateTender = async (req, res) => {
  Tender.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.status(200).send("Tender updated successfully");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.deleteTender = async (req, res) => {
  Tender.findByIdAndUpdate(req.params.id, { $set: { show: false } })
    .then(() => {
      res.status(200).send("Tender deleted successfully");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.showAllTender = async (req, res) => {
  Tender.find({})
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json("Error: " + err));
};
