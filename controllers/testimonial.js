const Testimonial = require("../models/testimonial");

exports.addTestimonial = async (req, res) => {
  if (req.body?.name === undefined || req.body?.messageText === undefined) {
    return res.status(400).send("Error: Name and Message are required");
  }
  const data = new Testimonial({
    name: req.body?.name,
    messageText: req.body?.messageText,
    designation: req.body?.designation,
    image: req.body?.image,
    sourceOfInfo: {
      name: req.body?.sourceOfInfo?.name,
      email: req.body?.sourceOfInfo?.email,
      designation: req.body?.sourceOfInfo?.designation,
      department: req.body?.sourceOfInfo?.department,
    },
    order: req.body?.order,
  });

  data
    .save()
    .then(() => res.status(200).send(data))
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.getTestimonial = async (req, res) => {
  if (req.query.id !== undefined) {
    Testimonial.find({ _id: req.query.id })
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send("Error: " + err));
  }
  else{
    Testimonial.find({ show: true })
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send("Error: " + err));
  }
 
};


exports.updateTestimonial = async (req, res) => {
  Testimonial.findByIdAndUpdate(req.params.id, {
    name: req.body?.name,
    messageText: req.body?.messageText,
    designation: req.body?.designation,
    image: req.body?.image,
    sourceOfInfo: {
        name: req.body?.sourceOfInfo?.name,
        email: req.body?.sourceOfInfo?.email,
        designation: req.body?.sourceOfInfo?.designation,
        department: req.body?.sourceOfInfo?.department,
        },
    order: req.body?.order,
    
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.deleteTestimonial = async (req, res) => {
  Testimonial.findByIdAndUpdate(req.params.id, { $set: { show: false } })
    .then(() => {
      res.status(200).send("Testimonial deleted successfully");
    })
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.getAllTestimonial = async (req, res) => {
  Testimonial.find()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send("Error: " + err));
};
