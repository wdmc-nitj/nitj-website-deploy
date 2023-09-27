const NitjMessages = require("./../models/nitj_message");

exports.addNitjMessage = async (req, res) => {
  if (req.body?.category === undefined || req.body?.content === undefined) {
    return res.status(400).send("Error: Name requried is required");
  }

  const nitjMessages = new NitjMessages({
    category: req.body?.category,
    content: req.body?.content,
  });

  nitjMessages
    .save()
    .then((nitjMessages) => res.status(200).send(nitjMessages))
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.getNitjMessage = async (req, res) => {
    if (req.query.id !== undefined) {
        NitjMessages.find({ _id: req.query.id })
            .then((nitjMessages) => res.status(200).send(nitjMessages))
            .catch((err) => res.status(400).send("Error: " + err));
    }
    else {
        NitjMessages.find({ show: true })
            .then((nitjMessages) => res.status(200).send(nitjMessages))
            .catch((err) => res.status(400).send("Error: " + err));
    }
};

//----------------------------------------------------------------------->
exports.updateNitjMessage = async (req, res) => {
    NitjMessages.findByIdAndUpdate(req.params.id, {
        category: req.body?.category,
        content: req.body?.content,
        show: true,
    })
        .then(() => res.status(200).send("Message updated."))
        .catch((err) => res.status(404).send("Error: " + err));
};

//----------------------------------------------------------------------->
exports.deleteNitjMessage = async (req, res) => {
    NitjMessages.findByIdAndUpdate(req.params.id, { $set: { show: false } })
        .then(() => res.status(200).send("Message deleted."))
        .catch((err) => res.status(404).send("Error: " + err));
};

exports.showallNitjMessage = async (req, res) => {
    NitjMessages.find()
        .then((nitjMessages) => res.status(200).send(nitjMessages))
        .catch((err) => res.status(404).send("Error: " + err));
};

exports.getCategoryNitjMessage = async (req, res) => {
    NitjMessages.find({ category: req.params.category, show: true })
        .then((nitjMessages) => res.status(200).send(nitjMessages))
        .catch((err) => res.status(404).send("Error: " + err));
};