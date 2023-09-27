const Internship_Insight = require("./../models/internship_insights");

exports.addInternship_Insight = async (req, res) => {
  if (
    req.body?.name === undefined ||
    req.body?.course === undefined ||
    req.body?.department === undefined ||
    req.body?.stipend === undefined ||
    req.body?.year === undefined ||
    req.body?.company === undefined
  ) {
    return res.status(400).send("Error: All fields are required");
  }

  const internship_insight = new Internship_Insight({
    name: req.body?.name,
    course: req.body?.course,
    department: req.body?.department,
    stipend: req.body?.stipend,
    year: req.body?.year,
    company: req.body?.company,
  });

  internship_insight
    .save()
    .then((internship_insight) => res.status(200).send(internship_insight))
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.getInternship_Insight = async (req, res) => {
  if (req.query.id !== undefined) {
    Internship_Insight.find({ _id: req.query.id })
      .then((internship_insight) => res.status(200).send(internship_insight))
      .catch((err) => res.status(400).send("Error: " + err));
  } else {
    Internship_Insight.find({ show: true })
      .then((internship_insights) => res.status(200).send(internship_insights))
      .catch((err) => res.status(400).send("Error: " + err));
  }
};

//----------------------------------------------------------------------->
exports.updateInternship_Insight = async (req, res) => {
  Internship_Insight.findByIdAndUpdate(req.params.id, {
    name: req.body?.name,
    course: req.body?.course,
    department: req.body?.department,
    stipend: req.body?.stipend,
    year: req.body?.year,
    company: req.body?.company,
    show: true,
  })
    .then(() => res.status(200).send("Internship_Insight updated."))
    .catch((err) => res.status(404).send("Error: " + err));
};

//----------------------------------------------------------------------->
exports.deleteInternship_Insight = async (req, res) => {
  Internship_Insight.findByIdAndUpdate(req.params.id, { $set: { show: false } })
    .then(() => res.status(200).send("Internship_Insight deleted."))
    .catch((err) => res.status(404).send("Error: " + err));
};

exports.showallInternship_Insights = async (req, res) => {
  Internship_Insight.find()
    .then((internship_insights) => res.status(200).send(internship_insights))
    .catch((err) => res.status(404).send("Error: " + err));
};