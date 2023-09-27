const FAQ = require("./../models/faqs");

exports.addFAQ = async (req, res) => {
  if (req.body?.question === undefined || req.body?.answer === undefined) {
    return res.status(400).send("Error: Question and Answer is required");
  }

  const faq = new FAQ({
    question: req.body?.question,
    answer: req.body?.answer,
    related: req.body?.related,
  });

  faq
    .save()
    .then((faq) => res.status(200).send(faq))
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.getFAQ = async (req, res) => {
    if (req.query.id !== undefined) {
        FAQ.find({ _id: req.query.id })
            .then((faq) => res.status(200).send(faq))
            .catch((err) => res.status(400).send("Error: " + err));
    }
    else {
        FAQ.find({ show: true })
            .then((faqs) => res.status(200).send(faqs))
            .catch((err) => res.status(400).send("Error: " + err));
    }
};

//----------------------------------------------------------------------->
exports.updateFAQ = async (req, res) => {
    FAQ.findByIdAndUpdate(req.params.id, {
        question: req.body?.question,
        answer: req.body?.answer,
        related: req.body?.related,
        show: true,
    })
        .then(() => res.status(200).send("FAQ updated."))
        .catch((err) => res.status(404).send("Error: " + err));
};

//----------------------------------------------------------------------->
exports.deleteFAQ = async (req, res) => {
    FAQ.findByIdAndUpdate(req.params.id, { $set: { show: false } })
        .then(() => res.status(200).send("FAQ deleted."))
        .catch((err) => res.status(404).send("Error: " + err));
};

exports.showallFAQs = async (req, res) => {
    FAQ.find()
        .then((faqs) => res.status(200).send(faqs))
        .catch((err) => res.status(404).send("Error: " + err));
};

exports.getRelatedFAQs = async (req, res) => {
    FAQ.find({ related: req.params.related })
        .then((faqs) => res.status(200).send(faqs))
        .catch((err) => res.status(404).send("Error: " + err));
};