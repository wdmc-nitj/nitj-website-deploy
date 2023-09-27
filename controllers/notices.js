const Notice = require("./../models/notices");

exports.addNotice = async (req, res) => {
  if (req.body?.text === undefined) {
    return res.status(400).send("Error: Title is required");
  }

  const notice = new Notice({
    text: req.body?.text,
  });

  notice
    .save()
    .then((notice) => res.status(200).send(notice))
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.getNotice = async (req, res) => {
    if (req.query.id !== undefined) {
        Notice.find({ _id: req.query.id })
            .then((notice) => res.status(200).send(notice))
            .catch((err) => res.status(400).send("Error: " + err));
    }
    else {
        Notice.find({ show: true }).sort({updatedAt: -1})
            .then((notices) => res.status(200).send(notices))
            .catch((err) => res.status(400).send("Error: " + err));
    }
};

//----------------------------------------------------------------------->
exports.updateNotice = async (req, res) => {
    Notice.findByIdAndUpdate(req.params.id, {
        text: req.body?.text,
        show: true,
    })
        .then(() => res.status(200).send("Notice updated."))
        .catch((err) => res.status(404).send("Error: " + err));
};

//----------------------------------------------------------------------->
exports.deleteNotice = async (req, res) => {
    Notice.findByIdAndUpdate(req.params.id, { $set: { show: false } })
        .then(() => res.status(200).send("Notice deleted."))
        .catch((err) => res.status(404).send("Error: " + err));
};

exports.showallNotices = async (req, res) => {
    Notice.find().sort({updatedAt: -1})
        .then((notices) => res.status(200).send(notices))
        .catch((err) => res.status(404).send("Error: " + err));
};
