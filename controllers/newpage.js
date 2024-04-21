const newpage = require("../models/newpage");

exports.addNewpage = async (req, res) => {
  const content = req.body?.content;
  const title = req.body?.title;

  const Newpage = new newpage({
    content: content,
    title: title,
  });

  Newpage.save()
    .then((news) => res.status(200).send("New Page added successfully"))
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.getNewPage = async (req, res) => {
  newpage
    .find({})
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.getNewPagebyId = async (req, res) => {
  if (req.query.id) {
    newpage
    .findOne({ _id: req.query.id })
    .then((data) => {
      if (data.disable) {
        res.status(400).send('Error: This page is disabled.')
      } else {
        res.status(200).send(data)
      }
    })
    .catch((err) => res.status(400).send('Error: ' + err))
  } else {
    newpage
      .find({ show: true })
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send("Error: " + err));
  }
};

exports.updatenewPage = async (req, res) => {
  newpage
    .findByIdAndUpdate(req.params.id, {
      content: req.body?.content,
      title: req.body?.title,
      show: req.body?.show,
    })
    .then(() => {
      res.status(200).send("News updated successfully");
    })
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.deletenewPage = async (req, res) => {
  newpage
    .findByIdAndUpdate(req.params.id, { $set: { show: req.body.show } })
    .then(() => {
      res.status(200).send("New Page deleted successfully");
    })
    .catch((err) => res.status(400).send("Error: " + err));
};
