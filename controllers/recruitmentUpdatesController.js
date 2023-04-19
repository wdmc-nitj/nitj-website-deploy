const { sendError, validateID } = require('../utils');
const { RecruitmentUpdate, DefaultJobsTab } = require('../models/recruitmentUpdates');

// GET all recruitment updates
const getAllRecruitmentUpdates = (req, res) => {
    let filter = {};

    if (req.query.visible === 'visible') {
        filter.visible = true;
    } else if (req.query.visible === 'hidden') {
        filter.visible = false;
    } else if (req.query.visible !== 'all') {
        return sendError(res, `Invalid value for visible: ${req.query.visible}`);
    }

    RecruitmentUpdate
        .find(filter)
        .sort({ updatedAt: -1 })
        .then((recruitmentUpdates) => res.json(recruitmentUpdates))
        .catch((err) => sendError(res, err));
};

// get visible recruitment updates by category
const getVisibleRecruitmentUpdatesByCategory = (req, res) => {
    const category = req.query.category;

    if (!category) {
        return sendError(res, 'Category is empty');
    }

    // filter by category if it is not 'all'
    let filter = { visible: true };

    if (category !== 'all') {
        filter.category = category;
    }

    RecruitmentUpdate
        .find(filter)
        .sort({ order: -1 })
        .then((recruitmentUpdates) => res.json(recruitmentUpdates))
        .catch((err) => sendError(res, err));
};

// Create a new recruitment update
const createRecruitmentUpdate = (req, res) => {
    const newRecruitmentUpdate = new RecruitmentUpdate(req.body);

    newRecruitmentUpdate.save()
        .then((createdRecruitmentUpdate) => res.status(201).json(createdRecruitmentUpdate))
        .catch((err) => sendError(res, err));
};

// GET a recruitment update by ID
const getRecruitmentUpdateByID = (req, res) => {
    const id = req.query.id;

    if (!validateID(id)) {
        return sendError(res, `Invalid ID: ${id}`);
    }

    RecruitmentUpdate
        .findById(id)
        .then((recruitmentUpdate) => {
            if (!recruitmentUpdate) {
                return sendError(res, `Recruitment update not found with ID: ${id}`);
            }

            res.json(recruitmentUpdate);
        })
        .catch((err) => sendError(res, err));
};

// Edit a recruitment update by ID
const editRecruitmentUpdateByID = (req, res) => {
    const id = req.query.id;

    if (!validateID(id)) {
        return sendError(res, `Invalid ID: ${id}`);
    }

    RecruitmentUpdate
        .findByIdAndUpdate(id, req.body, { new: true })
        .then((updatedRecruitmentUpdate) => {
            if (!updatedRecruitmentUpdate) {
                return sendError(res, `Recruitment update not found with ID: ${id}`);
            }

            res.json(updatedRecruitmentUpdate);
        })
        .catch((err) => sendError(res, err));
};

// Hide a recruitment update by ID
const editMetaData = (req, res) => {
    const id = req.query.id;
    validateID(id).then(() => {
        RecruitmentUpdate.findById(id)
            .then((recruitmentUpdate) => {
                if (req.query.action === 'toggleVisibility') {
                    recruitmentUpdate.visible = !recruitmentUpdate.visible;
                    recruitmentUpdate.visibilityChangedAt = Date.now();
                } else {
                    return res.status(400).json({
                        message: 'Invalid action'
                    });
                }
                recruitmentUpdate.save()
                    .then((updatedRecruitmentUpdate) => res.json(updatedRecruitmentUpdate))
                    .catch((err) => sendError(res, err));
            })
            .catch((err) => sendError(res, err));
    })
        .catch((err) => sendError(res, err));
};

// Delete a recruitment update by ID
const deleteRecruitmentUpdateByID = (req, res) => {
    const id = req.query.id;

    if (!validateID(id)) {
        return sendError(res, `Invalid ID: ${id}`);
    }

    RecruitmentUpdate
        .findByIdAndDelete(id)
        .then((deletedRecruitmentUpdate) => {
            if (!deletedRecruitmentUpdate) {
                return sendError(res, `Recruitment update not found with ID: ${id}`);
            }

            res.json(deletedRecruitmentUpdate);
        })
        .catch((err) => sendError(res, err));
};

const getDefaultTabName = (req, res) => {
    DefaultJobsTab
        .findOne()
        .then((defaultTab) => {
            if (!defaultTab) {
                return sendError(res, 'Default tab not found');
            }

            res.json(defaultTab);
        })
        .catch((err) => sendError(res, err));
};

module.exports = {
    getAllRecruitmentUpdates,
    getVisibleRecruitmentUpdatesByCategory,
    createRecruitmentUpdate,
    getRecruitmentUpdateByID,
    editRecruitmentUpdateByID,
    hideRecruitmentUpdateByID: editMetaData,
    deleteRecruitmentUpdateByID,
    getDefaultTabName
};