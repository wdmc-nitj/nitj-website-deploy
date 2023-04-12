const mongoose = require('mongoose');

// Description: contains functions that are used in multiple files

const sendError = (res, err) => {
    // used to send error to client and console
    console.log(err);
    res.status(400).json(err);
};

const validateID = (id) => {
    // used to validate id
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
        // return the error as string to be used in catch
        return Promise.reject('Invalid ID, must be 12 bytes or a string of 24 hex characters');
    }
    return Promise.resolve();
};

// logUpdates
const regexForUpdateLogs = '/^findOneAnd/';
async function logUpdates(next) {
    // Check updated fields
    const updatedFields = Object.keys(this._update["$set"]);

    // Compare fields with existing document in database
    const existingDoc = await this.model.findOne(this.getQuery());

    const changedFields = updatedFields.filter((field) => {
        return existingDoc[`${field}`] !== this._update["$set"][`${field}`];
    });

    // Remove unnecessary fields from changed fields
    const unnecessaryFields = ["updatedAt", "updateLogs", "_id", "__v", "order"];

    const filteredChangedFields = changedFields.filter((field) => {
        return !unnecessaryFields.includes(field);
    });

    const updateLogsPrevious = existingDoc.updateLogs;
    const updateLogsNew = `${new Date().toLocaleString()} - ${filteredChangedFields.join(" ")}`;

    // Update the document's updateLogs field
    this._update["$set"].updateLogs = updateLogsPrevious
        ? `${updateLogsPrevious}\n${updateLogsNew}`
        : updateLogsNew;

    // Call the next middleware in the chain
    next();
}

const commonFieldsForAll = {
    visible: {
        type: Boolean,
        default: true,
        required: true,
    },
    sourceOfInfo: {
        type: {
            name: {
                type: String,
                default: null
            },
            department: {
                type: String,
                default: null
            },
            designation: {
                type: String,
                default: null
            },
            email: {
                type: String,
                default: null
            },
        }
    },
    order: {
        type: Number,
        default: 0
    },
    visibilityChangedAt: {
        type: Date,
        default: null
    },
    updateLogs: {
        type: Array,
        default: []
    },
};

const fields = {
    webURL: {
        link: {
            type: String,
            default: ""
        },
        newPage: {
            type: Boolean,
            default: false,
        },
    },
    newGIF: {
        new: {
            type: Boolean,
            default: true
        },
    },
    admissionsFields: {
        degree: {
            type: String,
            required: true,
            notEmpty: true,
            enum: ['BTECH', 'MTECH-CCMT', 'MTECH-SELF', 'MSC', 'MBA', 'PHD', 'FOREIGN'],
        },
    }
};

// exports these functions to be used in other files
module.exports = {
    sendError,
    validateID,
    commonFieldsForAll,
    logUpdates,
    regexForUpdateLogs,
    fields,
};