const YearlyRanking = require("../models/yearlyRanking");
//----------------------------------->

//----------------------------------------------------------------------->
exports.addYearlyRanking = async (req, res) => {
  if (req.body?.YearlyRanking === undefined) {
    return res.status(400).send("Error: YearlyRanking is required");
  }

  const afterRank = Array.isArray(req.body?.afterRank) ? req.body?.afterRank : [];

  const data = new YearlyRanking({
    YearlyRanking: req.body?.YearlyRanking,
    sourceOfInfo: {
      name: req.body?.sourceOfInfo?.name,
      email: req.body?.sourceOfInfo?.email,
      designation: req.body?.sourceOfInfo?.designation,
      department: req.body?.sourceOfInfo?.department,
    },
    order: req.body?.order,
    afterRank:afterRank,
  });

  data
    .save()
    .then(() => res.status(200).send(data))
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.showYearlyRanking = async (req, res) => {

  const afterRank=Array.isArray(req.body?.afterRank) ? req.body?.afterRank : [];

  if (req.query.id !== undefined) {
    YearlyRanking.find({ _id: req.query.id, afterRank:afterRank })
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send("Error: " + err));
  } else {
    YearlyRanking.find({ show: true })
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send("Error: " + err));
  }
};

exports.updateYearlyRanking = async (req, res) => {

  const afterRank=Array.isArray(req.body?.afterRank) ? req.body?.afterRank : [];

  YearlyRanking.findByIdAndUpdate(req.params.id, {
    YearlyRanking: req.body?.YearlyRanking,
    sourceOfInfo: {
      name: req.body?.sourceOfInfo?.name,
      email: req.body?.sourceOfInfo?.email,
      designation: req.body?.sourceOfInfo?.designation,
      department: req.body?.sourceOfInfo?.department,
    },
    order: req.body?.order,
    afterRank:afterRank,
  })
    .then(() => {
      res.status(200).send("YearlyRanking updated successfully");
    })
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.deleteYearlyRanking = async (req, res) => {

  const afterRank=Array.isArray(req.body?.afterRank) ? req.body?.afterRank : [];  

  YearlyRanking.findByIdAndUpdate(req.params.id, { $set: { show: false,  afterRank:afterRank } })
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
