const mongoose = require("mongoose");
//----------------------------------->

//Schema---------------------------->
const Schema = new mongoose.Schema(
  {
    name: { type: String },
    link: { type: String ,required:true},
    order: {
      type: Number,
    },
    type: {
      type: String,
      enum: ["photoGallery", "history", "homePageImageSlider"],
      default: "photoGallery",
    },
    new: {
      type: Boolean,
    },
    show: {
      type: Boolean,
      default: true,
    },
    explore: {
      type: Boolean,
      default: true,

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
const Model = mongoose.model("PhotoGallery", Schema);

//Export----------------------------->
module.exports = Model;
