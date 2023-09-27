const Policy = require("./../models/policies");

exports.addPolicy = async (req, res) => {
  if (req.body?.category === undefined || req.body?.content === undefined) {
    return res.status(400).send("Error: Name requried is required");
  }

  const policy = new Policy({
    category: req.body?.category,
    content: req.body?.content,
  });

  policy
    .save()
    .then((policy) => res.status(200).send(policy))
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.getPolicy = async (req, res) => {
    if (req.query.id !== undefined) {
        Policy.find({ _id: req.query.id })
            .then((policy) => res.status(200).send(policy))
            .catch((err) => res.status(400).send("Error: " + err));
    }
    else {
        Policy.find({ show: true })
            .then((policies) => res.status(200).send(policies))
            .catch((err) => res.status(400).send("Error: " + err));
    }
};

//----------------------------------------------------------------------->
exports.updatePolicy = async (req, res) => {
    Policy.findByIdAndUpdate(req.params.id, {
        category: req.body?.category,
        content: req.body?.content,
        show: true,
    })
        .then(() => res.status(200).send("Policy updated."))
        .catch((err) => res.status(404).send("Error: " + err));
};

//----------------------------------------------------------------------->
exports.deletePolicy = async (req, res) => {
    Policy.findByIdAndUpdate(req.params.id, { $set: { show: false } })
        .then(() => res.status(200).send("Policy deleted."))
        .catch((err) => res.status(404).send("Error: " + err));
};

exports.showallPolicies = async (req, res) => {
    Policy.find()
        .then((policies) => res.status(200).send(policies))
        .catch((err) => res.status(404).send("Error: " + err));
};

exports.getCategoryPolicies = async (req, res) => {
    Policy.find({ category: req.params.category, show: true })
        .then((policies) => res.status(200).send(policies))
        .catch((err) => res.status(404).send("Error: " + err));
};