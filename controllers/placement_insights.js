const Placement_Insight = require("./../models/placement_insights");

exports.addPlacement_Insight = async (req, res) => {
  if (
    req.body?.name === undefined ||
    req.body?.course === undefined ||
    req.body?.department === undefined ||
    req.body?.package === undefined ||
    req.body?.year === undefined ||
    req.body?.company === undefined
  ) {
    return res.status(400).send("Error: All fields are required");
  }

  const placement_insight = new Placement_Insight({
    name: req.body?.name,
    course: req.body?.course,
    department: req.body?.department,
    package: req.body?.package,
    year: req.body?.year,
    company: req.body?.company,
  });

  placement_insight
    .save()
    .then((placement_insight) => res.status(200).send(placement_insight))
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.getPlacement_Insight = async (req, res) => {
  if (req.query.id !== undefined) {
    Placement_Insight.find({ _id: req.query.id })
      .then((placement_insight) => res.status(200).send(placement_insight))
      .catch((err) => res.status(400).send("Error: " + err));
  } else {
    Placement_Insight.find({ show: true })
      .then((placement_insights) => res.status(200).send(placement_insights))
      .catch((err) => res.status(400).send("Error: " + err));
  }
};

//----------------------------------------------------------------------->
exports.updatePlacement_Insight = async (req, res) => {
  Placement_Insight.findByIdAndUpdate(req.params.id, {
    name: req.body?.name,
    course: req.body?.course,
    department: req.body?.department,
    package: req.body?.package,
    year: req.body?.year,
    company: req.body?.company,
    show: true,
  })
    .then(() => res.status(200).send("Placement_Insight updated."))
    .catch((err) => res.status(404).send("Error: " + err));
};

//----------------------------------------------------------------------->
exports.deletePlacement_Insight = async (req, res) => {
  Placement_Insight.findByIdAndUpdate(req.params.id, { $set: { show: false } })
    .then(() => res.status(200).send("Placement_Insight deleted."))
    .catch((err) => res.status(404).send("Error: " + err));
};

exports.showallPlacement_Insights = async (req, res) => {
  Placement_Insight.find()
    .then((placement_insights) => res.status(200).send(placement_insights))
    .catch((err) => res.status(404).send("Error: " + err));
};