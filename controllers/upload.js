exports.upload = async (req, res) => {
  try {
    console.log("in upload function");
    const file = req.file;
    console.log(file);

    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      res.send(error);
    }

    const currentUrl = `${req.protocol}://${req.headers.host}`;
    res.json({
      link: `${currentUrl}/files/${file.filename}`,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
};
