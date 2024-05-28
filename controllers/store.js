const store = require("../models/store");
const Store = require("../models/store");

exports.addStore = async (req, res) => {
  const title = req.body?.title;
  const content = req.body?.content;

  const store = new Store({
    title: title,
    content: content,
  });

  store
    .save()
    .then(() => res.status(200).send("store saved succesfully"))
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.getStorebyId = async (req, res) => {
  if (req.params.id) {
    store
      .findOne({ _id: req.params.id })
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(400).send("Error: " + err));
  } 

  else{
    res.send("No data");
  }
};

exports.getStore=async(req,res)=>{
    store
      .find({})
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).send("Error: " + err);
      });
}

exports.updateStore = async (req, res) => {
  store
    .findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      content: req.body.content,
    })
    .then(() => {
      res.status(200).send("updated successfully");
    })
    .catch((err) => res.status(400).send("Error: " + err));
};
