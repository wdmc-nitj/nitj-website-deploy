const Placement_Insights_img = require("./../models/placement_insights_img");

exports.addPlacement_Insights_img = async (req, res) => {
  if (req.body?.link === undefined) {
    return res.status(400).send("Error: Image link is required");
  }

  const placement_insight_img = new Placement_Insights_img({
    link: req.body?.link,
    category: req.body?.category,
  });

  placement_insight_img
    .save()
    .then((placement_insight_img) => res.status(200).send(placement_insight_img))
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.getPlacement_Insights_img = async (req, res) => {
  if (req.query.id !== undefined) {
    Placement_Insights_img.find({ _id: req.query.id })
      .then((placement_insight_img) => res.status(200).send(placement_insight_img))
      .catch((err) => res.status(400).send("Error: " + err));
  } else {
    Placement_Insights_img.find({ show: true })
      .then((placement_insight_img) => res.status(200).send(placement_insight_img))
      .catch((err) => res.status(400).send("Error: " + err));
  }
};

//----------------------------------------------------------------------->
exports.updatePlacement_Insights_img = async (req, res) => {
  Placement_Insights_img.findByIdAndUpdate(req.params.id, {
    link: req.body?.link,
    category: req.body?.category,
    show: true,
  })
    .then(() => res.status(200).send("Placement_Insights_img updated."))
    .catch((err) => res.status(404).send("Error: " + err));
};

//----------------------------------------------------------------------->
exports.deletePlacement_Insights_img = async (req, res) => {
  Placement_Insights_img.findByIdAndUpdate(req.params.id, { $set: { show: false } })
    .then(() => res.status(200).send("Placement_Insights_img deleted."))
    .catch((err) => res.status(404).send("Error: " + err));
};

exports.showallPlacement_Insights_img = async (req, res) => {
  Placement_Insights_img.find()
    .then((placement_insight_img) => res.status(200).send(placement_insight_img))
    .catch((err) => res.status(404).send("Error: " + err));
};
