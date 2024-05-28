const CitedResearch = require('../../models//research/researchPublications').CitedResearch;
const { sendError, validateID } = require('../../utils');

// GET all cited researches
const getAllCitedResearches = (req, res, next) => {
    // filter by req.query.visible if it is not 'all'
    let filter = {};

    if (req.query.visible === 'visible') {
        filter.visible = true;
    }
    else if (req.query.visible === 'hidden') {
        filter.visible = false;
    } else if (req.query.visible !== 'all') {
        return sendError(res, `Invalid value for visible: ${req.query.visible}`);
    }

    CitedResearch
        .find(filter)
        .then((citedResearches) => res.json(citedResearches))
        .catch((err) => sendError(res, err));
};

// GET top 10 cited researches
const getTop10CitedResearches = (req, res) => {
    CitedResearch
        .find({ visible: true })
        .sort({ 'cites.number': -1 })
        .limit(10)
        .then((citedResearches) => res.json(citedResearches))
        .catch((err) => sendError(res, err));
};

// GET cited research by id
const getCitedResearchById = (req, res) => {
    const id = req.query.id;
    validateID(id)
        .then(() => CitedResearch.findById(id))
        .then((citedResearch) => res.json(citedResearch))
        .catch((err) => sendError(res, err));
};

// POST create new cited research
const createCitedResearch = (req, res) => {
    const newCitedResearch = new CitedResearch(req.body);

    newCitedResearch.save()
        .then((createdCitedResearch) => res.status(201).json(createdCitedResearch))
        .catch((err) => sendError(res, err));
};

// PATCH edit cited research
const editCitedResearch = (req, res) => {
    const id = req.query.id;

    validateID(id)
        .then(() => {
            CitedResearch.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
                .then((updatedCitedResearch) => res.json(updatedCitedResearch))
                .catch((err) => sendError(res, err));
        })
        .catch((err) => sendError(res, err));
};

// PUT hide cited research
const editMetaData = (req, res) => {
    const id = req.query.id;
    validateID(id).then(() => {
        CitedResearch.findById(id)
            .then((citedResearch) => {
                if (req.query.action === 'toggleVisibility') {
                    citedResearch.visible = !citedResearch.visible;
                    citedResearch.visibilityChangedAt = Date.now();
                } else {
                    return res.status(400).json({
                        message: 'Invalid action'
                    });
                }
                citedResearch.save()
                    .then((updatedCitedResearch) => res.json(updatedCitedResearch))
                    .catch((err) => sendError(res, err));
            })
            .catch((err) => sendError(res, err));
    })
        .catch((err) => sendError(res, err));
};

// PUT delete cited research
const deleteCitedResearch = (req, res) => {
    const id = req.query.id;

    validateID(id)
        .then(() => CitedResearch.findByIdAndDelete(id))
        .then((deletedCitedResearch) => res.json(deletedCitedResearch))
        .catch((err) => sendError(res, err));
};

module.exports = {
    getAllCitedResearches,
    getTop10CitedResearches,
    getCitedResearchById,
    createCitedResearch,
    editCitedResearch,
    hideCitedResearch: editMetaData,
    deleteCitedResearch,
};