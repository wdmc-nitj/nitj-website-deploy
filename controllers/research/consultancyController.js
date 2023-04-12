const Consultancy = require('../../models/research/consultancy');
const { sendError, validateID } = require('../../utils');

const digitsToWords = (num) => {

    const a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
    const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';

    // trim extra spaces
    str = str.trim();

    // capitalize first letter
    str = str.charAt(0).toUpperCase() + str.slice(1);

    // add 'only' at the end if not present
    if (!str.endsWith('only')) {
        str += ' only';
    }

    return str;
};

const verifyAmountAndConvertToWords = (amountDigits) => {
    if (amountDigits === 0) {
        amountWords = 'Zero';
    }
    else if (!amountDigits) {
        return sendError(res, 'Amount is empty');
    }
    else {
        amountWords = digitsToWords(amountDigits);
    }

    return amountWords;
};
    

// GET all consultancies
const getAllConsultancies = (req, res) => {
    // filter by req.query.visible if it is not 'all'
    let filter = {};

    if (req.query.visible === 'visible') {
        filter.visible = true;
    } else if (req.query.visible === 'hidden') {
        filter.visible = false;
    } else if (req.query.visible !== 'all') {
        return sendError(res, `Invalid value for visible: ${req.query.visible}`);
    }

    Consultancy
        .find(filter)
        .sort({ startYear: -1 })
        .then((consultancies) => res.json(consultancies))
        .catch((err) => sendError(res, err));
};

// GET all visible consultancies by start year
const getVisibleConsultanciesInStartYear = (req, res) => {
    const startYear = parseInt(req.query.startYear);

    if (!startYear) {
        return sendError(res, `Invalid value for startYear: ${req.query.startYear}`);
    }

    Consultancy
        .find({ visible: true, startYear: startYear })
        .sort({ startYear: -1 })
        .then((consultancies) => res.json(consultancies))
        .catch((err) => sendError(res, err));
};

// GET all visible consultancies grouped by start year
const getVisibleConsultanciesGroupedByStartYear = (req, res) => {

    Consultancy
        .find({ visible: true })
        .sort({ startYear: -1 })
        .then((consultancies) => {
            let groupedConsultancies = {};
            consultancies.forEach((consultancy) => {
                if (!groupedConsultancies[consultancy.startYear]) {
                    groupedConsultancies[consultancy.startYear] = [];
                }
                groupedConsultancies[consultancy.startYear].push(consultancy);
            });
            res.json(groupedConsultancies);
        })
        .catch((err) => sendError(res, err));
};

// Create a new consultancy
const createConsultancy = (req, res) => {
    const newConsultancy = new Consultancy(req.body);

    newConsultancy.amountWords = verifyAmountAndConvertToWords(newConsultancy.amountDigits);

    newConsultancy.save()
        .then((createdConsultancy) => res.status(201).json(createdConsultancy))
        .catch((err) => sendError(res, err));
};

// GET a consultancy by ID
const getConsultancyByID = (req, res) => {
    const id = req.query.id;

    if (!validateID(id)) {
        return sendError(res, `Invalid ID: ${id}`);
    }

    Consultancy
        .findById(id)
        .then((consultancy) => {
            if (!consultancy) {
                return sendError(res, `Consultancy not found with ID: ${id}`);
            }

            res.json(consultancy);
        })
        .catch((err) => sendError(res, err));
};

// Update a consultancy by ID
const updateConsultancyByID = (req, res) => {
    const id = req.query.id;

    if (!validateID(id)) {
        return sendError(res, `Invalid ID: ${id}`);
    }

    Consultancy
        .findById(id)
        .then((consultancy) => {
            if (!consultancy) {
                return sendError(res, `Consultancy not found with ID: ${id}`);
            }

            const updatedConsultancy = req.body;
            updatedConsultancy.amountWords = verifyAmountAndConvertToWords(updatedConsultancy.amountDigits);

            // Update the consultancy
            Consultancy
                .findByIdAndUpdate(id, updatedConsultancy, { new: true })
                .then((updatedConsultancy) => res.json(updatedConsultancy))
                .catch((err) => sendError(res, err));
        })
        .catch((err) => sendError(res, err));
};

const editMetaData = (req, res) => {
    const id = req.query.id;
    validateID(id).then(() => {
        Consultancy.findById(id)
            .then((consultancy) => {
                if (req.query.action === 'toggleVisibility') {
                    consultancy.visible = !consultancy.visible;
                    consultancy.visibilityChangedAt = Date.now();
                } else {
                    return res.status(400).json({
                        message: 'Invalid action'
                    });
                }
                consultancy.save()
                    .then((updatedConsultancy) => res.json(updatedConsultancy))
                    .catch((err) => sendError(res, err));
            })
            .catch((err) => sendError(res, err));
    })
        .catch((err) => sendError(res, err));
};


// Delete a consultancy by ID
const deleteConsultancyByID = (req, res) => {
    const id = req.query.id;

    if (!validateID(id)) {
        return sendError(res, `Invalid ID: ${id}`);
    }

    Consultancy
        .findById(id)
        .then((consultancy) => {
            if (!consultancy) {
                return sendError(res, `Consultancy not found with ID: ${id}`);
            }

            // Delete the consultancy
            Consultancy
                .findByIdAndDelete(id)
                .then((deletedConsultancy) => res.json(deletedConsultancy))
                .catch((err) => sendError(res, err));
        })
        .catch((err) => sendError(res, err));
};


// Export all the functions
module.exports = {
    getAllConsultancies,
    getVisibleConsultanciesInStartYear,
    getVisibleConsultanciesGroupedByStartYear,
    createConsultancy,
    getConsultancyByID,
    updateConsultancyByID,
    hideConsultancyByID: editMetaData,
    deleteConsultancyByID
};