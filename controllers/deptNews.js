const LatestNews = require("../models/deptNews");
//----------------------------------->

//----------------------------------------------------------------------->
exports.addNews = async (req, res) => {
    if (req.body?.title === undefined) {
        return res.status(400).send("Error: Title is required");
    }

    const latestNews = new LatestNews({
        title: req.body?.title,
        desc: req.body?.desc,
        sourceOfInfo: {
            name: req.body?.sourceOfInfoName,
            email: req.body?.sourceOfInfoEmail,
            designation: req.body?.sourceOfInfoDesignation,
            department: req.body?.sourceOfInfoDepartment,
        },
        order: req.body?.order,
        new: req.body?.new,
    });

    latestNews
        .save()
        .then((news) => res.status(200).send("News added successfully"))
        .catch((err) => res.status(400).send("Error: " + err));
};

exports.getNews = async (req, res) => {
    if (req.query.id !== undefined) {
        LatestNews.find({ _id: req.query.id })
            .then((news) => res.status(200).send(news))
            .catch((err) => res.status(400).send("Error: " + err));
    } else if (req.query.title !== undefined) {
        const title = req.query.title.split("-").join(" ");
        return LatestNews.find({ title: title })
            .then((news) => res.status(200).send(news))
            .catch((err) => res.status(400).send("Error: " + err));
    } else {
        LatestNews.find({ show: true, department: req.params.dept }).sort('-order')
            .then((news) => {res.status(200).send(news)})
            .catch((err) => res.status(400).send("Error: " + err));
    }
};

exports.updateNews = async (req, res) => {
    LatestNews.findByIdAndUpdate(req.params.id, {
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
        .then(() => {
            res.status(200).send("News updated successfully");
        })
        .catch((err) => res.status(400).send("Error: " + err));
};

exports.deleteNews = async (req, res) => {
    LatestNews.findByIdAndUpdate(req.params.id, { $set: { show: false } })
        .then(() => {
            res.status(200).send("News deleted successfully");
        })
        .catch((err) => res.status(400).send("Error: " + err));
};

exports.getAllNews = async (req, res) => {
    LatestNews.find({})
        .then((news) => res.status(200).send(news))
        .catch((err) => res.status(400).send("Error: " + err));
};
