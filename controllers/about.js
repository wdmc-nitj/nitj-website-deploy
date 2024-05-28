const About = require("../models/about");

exports.addAbout = async (req, res) => {
  if(req.body?.heading === undefined ){
    return res.status(400).json("Error: Heading is required");
  }

  const about = new About({
    heading: req.body?.heading,
    desc: req.body?.desc,
    sourceofInfo:{
      name: req.body?.sourceofInfo?.name,
      email: req.body?.sourceofInfo?.email,
      designation: req.body?.sourceofInfo?.designation,
      department: req.body?.sourceofInfo?.department,
    },
    order: req.body?.order,
  });

  about
    .save()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.getAbout = async (req, res) => {
  if (req.query.id !== undefined) {
    About.find({ _id: req.query.id })
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    About.find({ show: true })
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).json("Error: " + err));
  }
};

exports.updateAbout = async (req, res) => {
  About.findByIdAndUpdate(req.params.id,{
    heading: req.body?.heading,
    desc: req.body?.desc,
    sourceofInfo: req.body?.sourceofInfo,
    order: req.body?.order,
  })
    .then(() => {
      res.status(200).send("About updated successfully");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.deleteAbout = async (req, res) => {
  About.findByIdAndUpdate(req.params.id, { $set: { show: false } })
    .then(() => {
      res.status(200).send("About deleted successfully");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.getAllAbout = async (req, res) => {
  About.find()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).json("Error: " + err));
};
