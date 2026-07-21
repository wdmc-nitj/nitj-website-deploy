const currentUrl = "https://nitj.ac.in/files";
// const currentUrl = "http://127.0.0.1:8000/files";
const fs = require('fs')
const path = require("path")


exports.upload = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      res.send(error);
    }
    
    res.json({
      link: `${currentUrl}/${file.newfilename}`,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    let link = req.body.link;

    if(link){
      // Only accept links that actually point at our files host, then reduce to
      // a bare filename so "../" traversal cannot escape the nitj_files dir.
      if (typeof link !== "string" || !link.startsWith(currentUrl + "/")) {
        return res.status(400).json({
          status: false,
          message: "Invalid file URL.",
        });
      }
      link = path.basename(link.substr(currentUrl.length + 1));

      const filesDir = path.join(__dirname, "..", "..", "nitj_files");
      const target = path.join(filesDir, link);
      // Final guard: resolved path must stay inside nitj_files.
      if (path.relative(filesDir, target).startsWith("..") || path.isAbsolute(path.relative(filesDir, target))) {
        return res.status(400).json({
          status: false,
          message: "Invalid file path.",
        });
      }

      await fs.unlink(target, (err) => {
        if(err){
          // just one error for now
          return res.status(200).json({
            status: false,
            message: "This file is not on server."
          })
        }
        
        return res.status(200).json({
          status: true,
          message: "File deleted successfully"
        })
      })
    }
    else{
      const error = new Error("Please provide valid URL!");
      error.httpStatusCode = 400;
      res.send(error);
    }
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
};
