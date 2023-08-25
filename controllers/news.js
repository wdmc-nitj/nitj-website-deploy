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

exports.getNews = async (req, res) => {
    try{
        console.log("Handling getNews request");
        if (req.query.id !== undefined) {
            const news = await LatestNews.find({ _id: req.query.id });
            return res.status(200).json(news);
        } else if (req.query.title !== undefined) {
            const title = req.query.title.split("-").join(" ");
            const news = await LatestNews.find({ title: title });
            return res.status(200).json(news);
        } else {
        
        const news = await LatestNews.find({ show: true })
        .sort({ pin: -1, updatedAt: -1 })
        .exec();
    return res.status(200).json(news);

}
}catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ message: "Internal server error" });
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
const pinNews = async (req, res) => {
    try {
      const { id, pin } = req.params;

      const updatedNews = await News.findByIdAndUpdate(id, { pin: pin === 'true' });
  
      if (!updatedNews) {
        return res.status(404).json({ message: 'News not found' });
      }
  
      return res.status(200).json({ message: 'News pinned successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  module.exports = {
    pinNews
  };
  
