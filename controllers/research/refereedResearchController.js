const { sendError, validateID } = require('../../utils');
const RefereedResearch = require('../../models/research/researchPublications').RefereedResearch;

// GET all refereed researches
const getAllRefereedResearches = (req, res, next) => {
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

    RefereedResearch
        .find(filter)
        .then((refereedResearches) => res.json(refereedResearches))
        .catch((err) => sendError(res, err));
};

// Create a new refereed research
const createRefereedResearch = (req, res) => {
    const newRefereedResearch = new RefereedResearch(req.body);

    newRefereedResearch.save()
        .then((createdRefereedResearch) => res.status(201).json(createdRefereedResearch))
        .catch((err) => sendError(res, err));
};

// Edit a refereed research
const editRefereedResearch = (req, res) => {
    const id = req.query.id;

    validateID(id)
        .then(() => {
            RefereedResearch.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
                .then((updatedRefereedResearch) => res.json(updatedRefereedResearch))
                .catch((err) => sendError(res, err));
        })
        .catch((err) => sendError(res, err));
};

// Get a refereed research by id
const getRefereedResearchById = (req, res) => {
    const id = req.query.id;
    validateID(id)
        .then(() => RefereedResearch
            .findById(id)
            .then((refereedResearch) => res.json(refereedResearch))
            .catch((err) => sendError(res, err)))
        .catch((err) => sendError(res, err));
};

// Hide a refereed research
const editMetaData = (req, res) => {
    const id = req.query.id;
    validateID(id).then(() => {
        RefereedResearch.findById(id)
            .then((ReferredResearch) => {
                if (req.query.action === 'toggleVisibility') {
                    ReferredResearch.visible = !ReferredResearch.visible;
                    ReferredResearch.visibilityChangedAt = Date.now();
                } else {
                    return res.status(400).json({
                        message: 'Invalid action'
                    });
                }
                ReferredResearch.save()
                    .then((updatedReferredResearch) => res.json(updatedReferredResearch))
                    .catch((err) => sendError(res, err));
            })
            .catch((err) => sendError(res, err));
    })
        .catch((err) => sendError(res, err));
};

// Delete a refereed research
const deleteRefereedResearch = (req, res) => {
    const id = req.query.id;

    validateID(id)
        .then(() => RefereedResearch.findByIdAndDelete(id))
        .then((deletedRefereedResearch) => res.json(deletedRefereedResearch))
        .catch((err) => sendError(res, err));
};

// add multiple refereed researches
const addMultipleRefereedResearches = (req, res) => {
    const newRefereedResearches = req.body;

    RefereedResearch.insertMany(newRefereedResearches)
        .then((createdRefereedResearches) => res.status(201).json(createdRefereedResearches))
        .catch((err) => sendError(res, err));
};


module.exports = {
    getAllRefereedResearches,
    createRefereedResearch,
    editRefereedResearch,
    getRefereedResearchById,
    hideRefereedResearch: editMetaData,
    deleteRefereedResearch,
    addMultipleRefereedResearches
};