const mongoose = require("mongoose");
//----------------------------------->

//Schema---------------------------->
const Schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    title2: { type: String, default: "" },
    desc: { type: String, default: "" },
    order: {
      type: Number,
      default: 0,
    },
    new: {
      type: Boolean,
      default: true,
    },
    newPage: {
      type: Boolean,
      default: false,
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
      enum: [
        "bt",
        "ch",
        "cy",
        "ce",
        "cse",
        "ee",
        "ece",
        "hm",
        "ipe",
        "it",
        "ice",
        "ma",
        "me",
        "ph",
        "tt",
        "cf",
      ],
    },
    type: {
      type: String,
      enum: [
        "Academics",
        "Admissions",
        "Tenders",
        "jobsFaculty",
        "jobsNonFaculty",
        "jobsFacultyContract",
        "jobsNonFacultyContract",
        "researchjobs",
        "Achievements",
        "others",
      ],
    },
    show: { type: Boolean, default: true },
    showviewall:{type:Boolean,default:true},
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

Schema.pre(/^findOneAndUpdate/, async function (next) {
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
const Model = mongoose.model("News", Schema);

//Export----------------------------->
module.exports = Model;
