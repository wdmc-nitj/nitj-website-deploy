const mongoose = require("mongoose");
//----------------------------------->

//Schema---------------------------->
const PublicationSchema = new mongoose.Schema(
  {
    authors: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String },
    url: { type: String },
    show: { type: Boolean, default: true },
    order: {
      type: Number,
    },
    new: {
      type: Boolean,
    },
    newPage: {
      type: Boolean,
    },
    pdfLink: {
      type: String,
    },
    sourceOfInfoName: {
      type: String,
    },
    sourceOfInfoEmail: {
      type: String,
    },
    sourceOfInfoDesignation: {
      type: String,
    },
    sourceOfInfoDepartment: {
      type: String,
      enum: ['bt', 'ch', 'cy', 'ce', 'cse', 'ee', 'ece', 'hm', 'ipe', 'it', 'ice', 'ma', 'me', 'ph', 'tt', 'cf']
    },
    updateLogs: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

//pre update hook for updateLogs---------------->

PublicationSchema.pre(/^findOneAndUpdate/, async function (next) {
  //check updated fields
  const updatedFields = Object.keys(this._update["$set"]);

  //compare fields with existing document in database
  const existingDoc = await this.model.findOne(this.getQuery());

  const changedFields = updatedFields.filter((field) => {
    return existingDoc[`${field}`] !== this._update["$set"][`${field}`];
  });

  //rempoving uneccesery fields from changed fields
  const unnecesseryFields = ["updatedAt", "updateLogs", "_id", "__v", "order"];

  const filteredChangedFields = changedFields.filter((field) => {
    return !unnecesseryFields.includes(field);
  });

  const updateLogsPrevious = existingDoc.updateLogs;
  const updateLogsNew = `${new Date().toLocaleString()} - ${filteredChangedFields.join(
    " "
  )}`;

  this._update["$set"].updateLogs = [...updateLogsPrevious, updateLogsNew];

  next();
});

//Model---------------------------->
const Model = mongoose.model("Publication", PublicationSchema);

//Export----------------------------->
module.exports = Model;

// object: {'Name of the Publication authority':value,'Publication Value':value}.
// proceed same s about us
