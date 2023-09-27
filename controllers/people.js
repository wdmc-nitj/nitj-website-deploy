const Person = require("./../models/people");

exports.addPerson = async (req, res) => {
  if (req.body?.category === undefined || req.body?.name === undefined) {
    return res.status(400).send("Error: Name requried is required");
  }

  const person = new Person({
    category: req.body?.category,
    name: req.body?.name,
    department: req.body?.department,
    designation: req.body?.designation,
    mobileno: req.body?.mobileno,
    email: req.body?.email,
    link: req.body?.link,
  });

  person
    .save()
    .then((person) => res.status(200).send(person))
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.getPerson = async (req, res) => {
    if (req.query.id !== undefined) {
        Person.find({ _id: req.query.id })
            .then((faq) => res.status(200).send(faq))
            .catch((err) => res.status(400).send("Error: " + err));
    }
    else {
        Person.find({ show: true })
            .then((people) => res.status(200).send(people))
            .catch((err) => res.status(400).send("Error: " + err));
    }
};

//----------------------------------------------------------------------->
exports.updatePerson = async (req, res) => {
    Person.findByIdAndUpdate(req.params.id, {
        category: req.body?.category,
        name: req.body?.name,
        department: req.body?.department,
        designation: req.body?.designation,
        mobileno: req.body?.mobileno,
        email: req.body?.email,
        link: req.body?.link,
        show: true,
    })
        .then(() => res.status(200).send("Person updated."))
        .catch((err) => res.status(404).send("Error: " + err));
};

//----------------------------------------------------------------------->
exports.deletePerson = async (req, res) => {
    Person.findByIdAndUpdate(req.params.id, { $set: { show: false } })
        .then(() => res.status(200).send("Person deleted."))
        .catch((err) => res.status(404).send("Error: " + err));
};

exports.showallPeople = async (req, res) => {
    Person.find()
        .then((people) => res.status(200).send(people))
        .catch((err) => res.status(404).send("Error: " + err));
};

exports.getCategoryPeople = async (req, res) => {
    Person.find({ category: req.params.category })
        .then((people) => res.status(200).send(people))
        .catch((err) => res.status(404).send("Error: " + err));
};