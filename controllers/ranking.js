const Ranking = require("../models/ranking");
//----------------------------------->

//----------------------------------------------------------------------->
exports.addRanking = async (req, res) => {
  if (req.body?.Ranking === undefined) {
    return res.status(400).send("Error: Ranking is required");
  }

  const data = new Ranking({
    Ranking: req.body?.Ranking,
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

exports.showRanking = async (req, res) => {
  if (req.query.id !== undefined) {
    Ranking.find({ _id: req.query.id })
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send("Error: " + err));
  } else {
    Ranking.find({ show: true })
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send("Error: " + err));
  }
};

exports.updateRanking = async (req, res) => {
  Ranking.findByIdAndUpdate(req.params.id, {
    Ranking: req.body?.Ranking,
    sourceOfInfo: {
      name: req.body?.sourceOfInfo?.name,
      email: req.body?.sourceOfInfo?.email,
      designation: req.body?.sourceOfInfo?.designation,
      department: req.body?.sourceOfInfo?.department,
    },
    order: req.body?.order,
  })
    .then(() => {
      res.status(200).send("Ranking updated successfully");
    })
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.deleteRanking = async (req, res) => {
  Ranking.findByIdAndUpdate(req.params.id, { $set: { show: false } })
    .then(() => {
      res.status(200).send("Ranking deleted successfully");
    })
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.showAllRanking = async (req, res) => {
  Ranking.find({})
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send("Error: " + err));
};
