const Notice = require("./../models/notice");

exports.addNotice = async (req, res) => {
    if (req.body?.title === undefined) {
        return res.status(400).send("Error: Title is required");
    }

    const notice = new Notice({
        title: req.body?.title,
        desc: req.body?.desc,
        sourceOfInfo: {
            name: req.body?.sourceOfInfo?.name,
            email: req.body?.sourceOfInfo?.email,
            designation: req.body?.sourceOfInfo?.designation,
            department: req.body?.sourceOfInfo?.department,
        },
        order: req.body?.order,
        new: req.body?.new,
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
    } else {
        Notice.find({ show: true })
            .then((notices) => res.status(200).send(notices))
            .catch((err) => res.status(400).send("Error: " + err));
    }
};

//----------------------------------------------------------------------->
exports.updateNotice = async (req, res) => {
    Notice.findByIdAndUpdate(req.params.id, {
        title: req.body?.title,
        desc: req.body?.desc,
        sourceOfInfo: {
            name: req.body?.sourceOfInfo?.name,
            email: req.body?.sourceOfInfo?.email,
            designation: req.body?.sourceOfInfo?.designation,
            department: req.body?.sourceOfInfo?.department,
        },
        order: req.body?.order,
        new: req.body?.new,
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

exports.showallNotice = async (req, res) => {
    Notice.find()
        .then((notices) => res.status(200).send(notices))
        .catch((err) => res.status(404).send("Error: " + err));
};
