const Placement_Stat = require("./../models/placement_stats");

exports.addPlacement_Stat = async (req, res) => {
  if (req.body?.link === undefined) {
    return res.status(400).send("Error: Image link is required");
  }

  const placement_stat = new Placement_Stat({
    link: req.body?.link,
  });

  placement_stat
    .save()
    .then((placement_stat) => res.status(200).send(placement_stat))
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.getPlacement_Stat = async (req, res) => {
  if (req.query.id !== undefined) {
    Placement_Stat.find({ _id: req.query.id })
      .then((placement_stat) => res.status(200).send(placement_stat))
      .catch((err) => res.status(400).send("Error: " + err));
  } else {
    Placement_Stat.find({ show: true })
      .then((placement_stats) => res.status(200).send(placement_stats))
      .catch((err) => res.status(400).send("Error: " + err));
  }
};

//----------------------------------------------------------------------->
exports.updatePlacement_Stat = async (req, res) => {
  Placement_Stat.findByIdAndUpdate(req.params.id, {
    link: req.body?.link,
    show: true,
  })
    .then(() => res.status(200).send("Placement_Stat updated."))
    .catch((err) => res.status(404).send("Error: " + err));
};

//----------------------------------------------------------------------->
exports.deletePlacement_Stat = async (req, res) => {
  Placement_Stat.findByIdAndUpdate(req.params.id, { $set: { show: false } })
    .then(() => res.status(200).send("Placement_Stat deleted."))
    .catch((err) => res.status(404).send("Error: " + err));
};

exports.showallPlacement_Stats = async (req, res) => {
  Placement_Stat.find()
    .then((placement_stats) => res.status(200).send(placement_stats))
    .catch((err) => res.status(404).send("Error: " + err));
};
