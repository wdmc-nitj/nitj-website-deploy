/* const store = require("../models/store"); */
const store = require("../models/store");

exports.addStore = async (req, res) => {
  try {
    const { category, title, content } = req.body;
    const Store =new store({
      category,
      content,
      title,
    });
    Store.save();
    res.status(200).send("store saved successfully");
  } catch (err) {
    console.error("Error in addStore controller:", err);
    res.status(500).send("Error: " + err.message);
  }
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

exports.getStore = async (req, res) => {
  const adminrole = req.query.adminrole; // Get the admin role from the query string
  let filter = {};

  // Apply filtering based on admin role
  if (adminrole === "diia") {
    filter = { category: "DIIA" }; // Example filter for DIIA role
  } else if (adminrole === "admin") {
    filter = {}; // Example filter for admin role
  }
  else if (adminrole === "restricted") {
    filter = { category: "restricted" };
  }
  // Perform the query with the filter
  store
    .find(filter)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send("Error: " + err);
    });
};


exports.updateStore = async (req, res) => {
  store
    .findByIdAndUpdate(req.params.id, {
      category: req.body.category,
      title: req.body.title,
      content: req.body.content,
    })
    .then(() => {
      res.status(200).send("updated successfully");
    })
    .catch((err) => res.status(400).send("Error: " + err));
};
