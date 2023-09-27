const Process = require("./../models/processes");

exports.addProcess = async (req, res) => {
  if (req.body?.category === undefined || req.body?.content === undefined) {
    return res.status(400).send("Error: Name requried is required");
  }

  const process = new Process({
    category: req.body?.category,
    content: req.body?.content,
  });

  process
    .save()
    .then((process) => res.status(200).send(process))
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.getProcess = async (req, res) => {
    if (req.query.id !== undefined) {
        Process.find({ _id: req.query.id })
            .then((process) => res.status(200).send(process))
            .catch((err) => res.status(400).send("Error: " + err));
    }
    else {
        Process.find({ show: true })
            .then((processes) => res.status(200).send(processes))
            .catch((err) => res.status(400).send("Error: " + err));
    }
};

//----------------------------------------------------------------------->
exports.updateProcess = async (req, res) => {
    Process.findByIdAndUpdate(req.params.id, {
        category: req.body?.category,
        content: req.body?.content,
        show: true,
    })
        .then(() => res.status(200).send("Process updated."))
        .catch((err) => res.status(404).send("Error: " + err));
};

//----------------------------------------------------------------------->
exports.deleteProcess = async (req, res) => {
    Process.findByIdAndUpdate(req.params.id, { $set: { show: false } })
        .then(() => res.status(200).send("Process deleted."))
        .catch((err) => res.status(404).send("Error: " + err));
};

exports.showallProcesses = async (req, res) => {
    Process.find()
        .then((processes) => res.status(200).send(processes))
        .catch((err) => res.status(404).send("Error: " + err));
};

exports.getCategoryProcesses = async (req, res) => {
    Process.find({ category: req.params.category, show: true })
        .then((processes) => res.status(200).send(processes))
        .catch((err) => res.status(404).send("Error: " + err));
};