const admissionHelpline = require('../../models/admissions/admissionHelpline');
const { sendError, validateID } = require('../../utils');

const createHelpline = (req, res) => {
    const helpline = new admissionHelpline(req.body);

    helpline.save()
        .then((createdHelpline) => res.status(201).json(createdHelpline))
        .catch((err) => sendError(res, err));
}

const getHelplines = (req, res) => {
    let filter = {};
    // filter by req.query.degree if it is not 'all'
    if (req.query.degree !== 'all') {
        filter.degree = req.query.degree;
    }

    // filter by req.query.visible if it is not 'all'
    if (req.query.visible === 'visible') {
        filter.visible = true;
    } else if (req.query.visible === 'hidden') {
        filter.visible = false;
    }

    admissionHelpline.find(filter)
        .sort({createdAt: 1 })
        .then((helplines) => res.json(helplines))
        .catch((err) => sendError(res, err));
}

const getHelplineById = (req, res) => {
    const id = req.query.id;
    validateID(id).then(() => {
        admissionHelpline.findById(id)
            .then((helpline) => res.json(helpline))
            .catch((err) => sendError(res, err));
    })
        .catch((err) => sendError(res, err));
}

const editHelpline = (req, res) => {
    const id = req.query.id;
    validateID(id).then(() => {
        admissionHelpline.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
            .then((helpline) => res.json(helpline))
            .catch((err) => sendError(res, err));
    })
        .catch((err) => sendError(res, err));
}

const editMetaData = (req, res) => {
    const id = req.query.id;

    validateID(id).then(() => {
        admissionHelpline.findById(id)
            .then((helpline) => {
                if (req.query.action === 'toggleVisibility') {
                    helpline.visible = !helpline.visible;
                    helpline.visibilityChangedAt = Date.now();
                } else {
                    return res.status(400).json({
                        message: 'Invalid action'
                    });
                }
                helpline.save()
                    .then((updatedHelpline) => res.json(updatedHelpline))
                    .catch((err) => sendError(res, err));
            })
            .catch((err) => sendError(res, err));
    })
        .catch((err) => sendError(res, err));
}

const deleteHelpline = (req, res) => {
    const id = req.query.id;
    validateID(id).then(() => {
        admissionHelpline.findByIdAndDelete(id)
            .then((deletedHelpline) => res.json(deletedHelpline))
            .catch((err) => sendError(res, err));
    })
        .catch((err) => sendError(res, err));
}

module.exports = {
    createHelpline,
    getHelplines,
    getHelplineById,
    editHelpline,
    toggleHelplineVisiblity: editMetaData,
    deleteHelpline
}