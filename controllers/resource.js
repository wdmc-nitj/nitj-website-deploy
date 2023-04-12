const Resource = require("./../models/resource");

exports.addResource = async (req, res) => {
  const resource = new Resource({
    resourceName: req.body?.resourceName,
    resourceType: req.body?.resourceType,
    resourceLink: req.body?.resourceLink,
    resourceFileType: req.body?.resourceFileType,
    resourceDescription: req.body?.resourceDescription,
    order: req.body?.order,
  });

  resource
    .save()
    .then(() => res.status(200).send(resource))
    .catch((err) => res.status(500).send("Error: " + err));
};

//----------------------------------------------------------------------->
exports.getResource = async (req, res) => {
  if (req.query.id !== undefined) {
    Resource.find({ _id: req.query.id })
      .then((Resource) => res.status(200).send(Resource))
      .catch((err) => res.status(404).send("Error: " + err));
  } else {
    Resource.find()
      .then((Resource) => res.status(200).send(Resource))
      .catch((err) => res.status(404).send("Error: " + err));
  }
};

//----------------------------------------------------------------------->
exports.deleteResource = async (req, res) => {
  Resource.findByIdAndUpdate(req.params.id, {
    $set: {
      show: false,
    },
  })
    .then((Resource) => res.status(200).send(Resource))
    .catch((err) => res.status(400).send("Error: " + err));
};

//----------------------------------------------------------------------->
exports.getResourceall = async (req, res) => {
  if (req.body.showDeleted) {
    Resource.find()
      .then((Resource) => res.status(200).send(Resource))
      .catch((err) => res.status(404).send("Error: " + err));
  } else {
    Resource.find({ show: true })
      .then((Resource) => res.status(200).send(Resource))
      .catch((err) => res.status(404).send("Error: " + err));
  }
};

//----------------------------------------------------------------------->
exports.updateResource = async (req, res) => {
  Resource.findByIdAndUpdate(req.params.id, {
    resourceName: req.body?.resourceName,
    resourceType: req.body?.resourceType,
    resourceLink: req.body?.resourceLink,
    resourceFileType: req.body?.resourceFileType,
    resourceDescription: req.body?.resourceDescription,
    order: req.body?.order,
  })
    .then((Resource) => res.status(200).send(Resource))
    .catch((err) => res.status(400).send("Error: " + err));
};
