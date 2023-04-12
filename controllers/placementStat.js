const PlacementStat = require("../models/placementStat");
//----------------------------------->

//----------------------------------------------------------------------->
exports.addPlacementStat = async (req, res) => {
  if (req.body?.PlacementStat === undefined) {
    return res.status(400).send("Error: PlacementStat is required");
  }

  const data = new PlacementStat({
    PlacementStat: req.body?.PlacementStat,
    sourceOfInfo: {
      name: req.body?.sourceOfInfo?.name,
      email: req.body?.sourceOfInfo?.email,
      designation: req.body?.sourceOfInfo?.designation,
      department: req.body?.sourceOfInfo?.department,
    },
    order: req.body?.order,
  });

  data
    .save()
    .then(() => res.status(200).send(data))
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.showPlacementStat = async (req, res) => {
  if (req.query.id !== undefined) {
    PlacementStat.find({ _id: req.query.id })
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send("Error: " + err));
  } else {
    PlacementStat.find({ show: true })
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send("Error: " + err));
  }
};

exports.updatePlacementStat = async (req, res) => {
  PlacementStat.findByIdAndUpdate(req.params.id, {
    PlacementStat: req.body?.PlacementStat,
    sourceOfInfo: {
      name: req.body?.sourceOfInfo?.name,
      email: req.body?.sourceOfInfo?.email,
      designation: req.body?.sourceOfInfo?.designation,
      department: req.body?.sourceOfInfo?.department,
    },
    order: req.body?.order,
  })
    .then(() => {
      res.status(200).send("PlacementStat updated successfully");
    })
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.deletePlacementStat = async (req, res) => {
  PlacementStat.findByIdAndUpdate(req.params.id, { $set: { show: false } })
    .then(() => {
      res.status(200).send("PlacementStat deleted successfully");
    })
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.showAllPlacementStat = async (req, res) => {
  PlacementStat.find({})
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send("Error: " + err));
};
