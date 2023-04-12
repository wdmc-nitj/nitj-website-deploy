const IPR = require('../../models/research/IPRs');
const { sendError, validateID } = require('../../utils');

const getIPRs = (req, res) => {
    let filter = {};

    // filter by req.query.category if it is not 'all'
    if (req.query.category !== 'all') {
        filter.category = req.query.category;
    }

    if (req.query.visible === 'visible') {
        filter.visible = true;
    } else if (req.query.visible === 'hidden') {
        filter.visible = false;
    } else if (req.query.visible !== 'all') {
        return sendError(res, `Invalid value for visible: ${req.query.visible}`);
    }

    IPR.find(filter)
        .then((IPRs) => res.json(IPRs))
        .catch((err) => sendError(res, err));
};

const getIPRById = (req, res) => {
    const id = req.query.id;
    validateID(id).then(() => {
        IPR.findById(id)
            .then((IPRs) => res.json(IPRs))
            .catch((err) => sendError(res, err));
    })
        .catch((err) => sendError(res, err));
};


module.exports = {
    getIPRs,
    getIPRById
};