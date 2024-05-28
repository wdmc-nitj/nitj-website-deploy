//import all models----------------------------->
const Administration = require("./../models/administration");
const Club = require("../models/club");
const LatestEvent = require("../models/latestEvent");
const LatestNews = require("../models/news");
const Notice = require("./../models/notice");
const Publication = require("../models/publication");
const ResearchHighlights = require("../models/researchHighlights");
const StudentTeam = require("../models/studentTeam");
const Tender = require("../models/tender");

//Export----------------------------->
exports.globalSearch = async (req, res) => {
    try {
        const { search: searchQuery } = req.body;
        const regex = new RegExp(searchQuery, "i");

        //global seach object
        let search = {};

        //performing queries
        const administrationData = await Administration.find({ name: regex });
        if (administrationData.length > 0) {
            search.administration = administrationData;
        }
        const clubData = await Club.find({ name: regex });
        if (clubData.length > 0) {
            search.club = clubData;
        }
        const latestEventData = await LatestEvent.find({ desc: regex });
        if (latestEventData.length > 0) {
            search.latestEvent = latestEventData;
        }
        const latestNewsData = await LatestNews.find({ desc: regex });
        if (latestNewsData.length > 0) {
            search.latestNews = latestNewsData;
        }
        const noticeData = await Notice.find({ desc: regex });
        if (noticeData.length > 0) {
            search.notice = noticeData;
        }
        const publicationData = await Publication.find({ Publication: { desc: regex } });
        if (publicationData.length > 0) {
            search.publication = publicationData;
        }
        const researchHighlightsData = await ResearchHighlights.find({ desc: regex });
        if (researchHighlightsData.length > 0) {
            search.researchHighlights = researchHighlightsData;
        }
        const studentTeamData = await StudentTeam.find({ name: regex });
        if (studentTeamData.length > 0) {
            search.studentTeam = studentTeamData;
        }
        const tenderData = await Tender.find({ desc: regex });
        if (tenderData.length > 0) {
            search.tender = tenderData;
        }
        
        res.status(200).json({ search });
    } 
    catch (error) {
        res.status(500).json({ error });
    }
};
