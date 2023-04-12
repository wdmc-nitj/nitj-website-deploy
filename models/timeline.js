const mongoose = require("mongoose");
//----------------------------------->

//Schema---------------------------->
const TimelineSchema = new mongoose.Schema(
  {
    year: { type: Number,required:true },
    desc: { type: String,required:true },
    show: { type: Boolean, default: true },
    order: {
      type: Number,
      default: 0,
    },
    new: {
      type: Boolean,
    },
    newPage: {
      type: Boolean,
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

TimelineSchema.pre(/^findOneAndUpdate/, async function (next) {
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
const Model = mongoose.model("Timeline", TimelineSchema);

//Export----------------------------->
module.exports = Model;

// object: {'Name of the Timeline authority':value,'Timeline Value':value}.
// proceed same s about us
