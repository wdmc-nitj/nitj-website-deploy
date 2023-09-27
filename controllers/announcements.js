const Announcement = require("./../models/announcements");

exports.addAnnouncement = async (req, res) => {
  if (req.body?.text === undefined) {
    return res.status(400).send("Error: Title is required");
  }

  const announcement = new Announcement({
    text: req.body?.text,
    link: req.body?.link,
  });

  announcement
    .save()
    .then((announcement) => res.status(200).send(announcement))
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.getAnnouncement = async (req, res) => {
    if (req.query.id !== undefined) {
        Announcement.find({ _id: req.query.id })
            .then((announcement) => res.status(200).send(announcement))
            .catch((err) => res.status(400).send("Error: " + err));
    }
    else {
        Announcement.find({ show: true }).sort({updatedAt: -1})
            .then((announcements) => res.status(200).send(announcements))
            .catch((err) => res.status(400).send("Error: " + err));
    }
};

//----------------------------------------------------------------------->
exports.updateAnnouncement = async (req, res) => {
    Announcement.findByIdAndUpdate(req.params.id, {
        text: req.body?.text,
        link: req.body?.link,
        show: true,
    })
        .then(() => res.status(200).send("Announcement updated."))
        .catch((err) => res.status(404).send("Error: " + err));
};

//----------------------------------------------------------------------->
exports.deleteAnnouncement = async (req, res) => {
    Announcement.findByIdAndUpdate(req.params.id, { $set: { show: false } })
        .then(() => res.status(200).send("Announcement deleted."))
        .catch((err) => res.status(404).send("Error: " + err));
};

exports.showallAnnouncements = async (req, res) => {
    Announcement.find().sort({updatedAt: -1})
        .then((announcements) => res.status(200).send(announcements))
        .catch((err) => res.status(404).send("Error: " + err));
};
