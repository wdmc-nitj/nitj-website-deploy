const InstituteProspectusLink = require("../models/instituteProspectusLink");
//----------------------------------->

//----------------------------------------------------------------------->
exports.addInstituteProspectusLink = async (req, res) => {
  const data = new InstituteProspectusLink(req.body);

  data
    .save()
    .then(() => res.status(200).send(data))
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.showInstituteProspectusLink = async (req, res) => {
  if (req.query.id !== undefined) {
    InstituteProspectusLink.find({ _id: req.query.id })
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send("Error: " + err));
  } else {
    InstituteProspectusLink.find({ show: true })
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send("Error: " + err));
  }
};

exports.updateInstituteProspectusLink = async (req, res) => {
  InstituteProspectusLink.findByIdAndUpdate(req.params.id, {
    InstituteProspectusLink: req.body?.InstituteProspectusLink,
    sourceOfInfo: {
      name: req.body?.sourceOfInfo?.name,
      email: req.body?.sourceOfInfo?.email,
      designation: req.body?.sourceOfInfo?.designation,
      department: req.body?.sourceOfInfo?.department,
    },
    order: req.body?.order,
  })
    .then(() => {
      res.status(200).send("InstituteProspectusLink updated successfully");
    })
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.deleteInstituteProspectusLink = async (req, res) => {
  InstituteProspectusLink.findByIdAndUpdate(req.params.id, {
    $set: { show: false },
  })
    .then(() => {
      res.status(200).send("InstituteProspectusLink deleted successfully");
    })
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.showAllInstituteProspectusLink = async (req, res) => {
  InstituteProspectusLink.find({})
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send("Error: " + err));
};
