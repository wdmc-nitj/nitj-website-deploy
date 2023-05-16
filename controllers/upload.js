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

    const currentUrl = "https://nitj.ac.in/files";
    // const currentUrl = "http://127.0.0.1:8000/files";
    res.json({
      link: `${currentUrl}/${file.newfilename}`,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
};
