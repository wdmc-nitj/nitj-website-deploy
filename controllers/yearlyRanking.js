const YearlyRanking = require("../models/yearlyRanking");
//----------------------------------->

//----------------------------------------------------------------------->
exports.addYearlyRanking = async (req, res) => {
  if (req.body?.YearlyRanking === undefined) {
    return res.status(400).send("Error: YearlyRanking is required");
  }

  const data = new YearlyRanking({
    YearlyRanking: req.body?.YearlyRanking,
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

exports.showYearlyRanking = async (req, res) => {
  if (req.query.id !== undefined) {
    YearlyRanking.find({ _id: req.query.id })
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send("Error: " + err));
  } else {
    YearlyRanking.find({ show: true })
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send("Error: " + err));
  }
};

exports.updateYearlyRanking = async (req, res) => {
  YearlyRanking.findByIdAndUpdate(req.params.id, {
    YearlyRanking: req.body?.YearlyRanking,
    sourceOfInfo: {
      name: req.body?.sourceOfInfo?.name,
      email: req.body?.sourceOfInfo?.email,
      designation: req.body?.sourceOfInfo?.designation,
      department: req.body?.sourceOfInfo?.department,
    },
    order: req.body?.order,
  })
    .then(() => {
      res.status(200).send("YearlyRanking updated successfully");
    })
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.deleteYearlyRanking = async (req, res) => {
  YearlyRanking.findByIdAndUpdate(req.params.id, { $set: { show: false } })
    .then(() => {
      res.status(200).send("YearlyRanking deleted successfully");
    })
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.showAllYearlyRanking = async (req, res) => {
  YearlyRanking.find({})
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send("Error: " + err));
};
