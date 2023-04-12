const PhotoGallery = require("../models/photoGallery");
//----------------------------------->

//----------------------------------------------------------------------->
exports.add = async (req, res) => {
  const photoGallery = new PhotoGallery({
    image: req.body.image,
    sourceOfInfo: req.body.sourceOfInfo,
    type: req.body.type,
  });

  photoGallery
    .save()
    .then(() => res.status(201).send(photoGallery))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.get = async (req, res) => {
  try {
    if (req.query.history) {
      const photos = await PhotoGallery.find({ type: "history" });
      return res.status(200).json(photos);
    }
    const photos = await PhotoGallery.find({});
    res.status(200).json(photos);
  } catch (error) {
    res.status(400).json({
      message: "Error occured",
      error: error,
    });
  }
};

exports.update = async (req, res) => {
  PhotoGallery.findByIdAndUpdate(req.params.id, {
    image: req.body.image,
  })
    .then(() => {
      res.status(200).send(" updated successfully");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.delete = async (req, res) => {
  PhotoGallery.findByIdAndUpdate(req.params.id, { show: false })
    .then(() => {
      res.status(200).send(" deleted successfully");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
