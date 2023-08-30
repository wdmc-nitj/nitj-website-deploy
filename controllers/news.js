const LatestNews = require("../models/news");
const {sendError} = require('../utils');
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
        pin: false,
    });

    latestNews
        .save()
        .then((news) => res.status(200).send("News added successfully"))
        .catch((err) => res.status(400).send("Error: " + err));
};

async function getPinnedNews() {
    try {
        const pinnedNews = await LatestNews.find({ show: true, pin: true });
        return pinnedNews;
    } catch (error) {
        throw error;
    }
}

async function getNonPinnedNews() {
    try {
        const nonPinnedNews = await LatestNews.find({ show: true, pin: false });
        return nonPinnedNews;
    } catch (error) {
        throw error;
    }
}

exports.getNews = async (req, res) => {
    
    try {
        const pinnedNews = await getPinnedNews();
        const nonPinnedNews = await getNonPinnedNews();

        // Combine pinned and non-pinned news in the desired order
        const news = [...pinnedNews, ...nonPinnedNews];
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
            LatestNews.find({ show: true })
            .then((news) => {res.status(200).send(news)})
            .catch((err) => res.status(400).send("Error: " + err));
    }
        // res.status(200).send(news);
    } catch (error) {
        res.status(400).send("Error: " + error);
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


exports.getNewsbyType = (req, res) => {
    let filter = { show : true };

    if (req.query.type !== 'all') {
        filter.type = req.query.type;
    }

    LatestNews
        .find(filter)
        .sort({ updatedAt: -1 })
        .then((news) => res.json(news))
        .catch((err) => sendError(res,err));
};

