
const Download = require("./../models/download");

exports.addDownload = async (req, res) => {
     
    if(req.body?.text == undefined || req.body?.category == undefined)
    {
        return res.status(400).send("Error: Title or category is required")
    }

    const download = new Download({
        text: req.body?.text,
        link: req.body?.link,
        category: req.body?.category,
    })
     
    console.log(download)
    download
    .save()
    .then((download)=>res.stauts(200).send(download))
    .catch((err) => res.status(200).send("Error: " + err));
}

exports.getDownload = async (req,res)=>{
    console.log("Query id is: ",req.params.id)
    if (req.params.id !== undefined) {
        Download.find({ _id: req.params.id })
            .then((download) => res.status(200).send(download))
            .catch((err) => res.status(400).send("Error: " + err));
    }
    else {
        Download.find({ show: true }).sort({updatedAt: -1})
            .then((download) => res.status(200).send(download))
            .catch((err) => res.status(400).send("Error: " + err));
    }
}

//---------------------------------------------------------------------------------
exports.updateDownload = async (req, res) => {
    Download.findByIdAndUpdate(req.params.id, {
        text: req.body?.text,
        link: req.body?.link,
        show: true,
        category: req.body?.category
    })
        .then(() => res.status(200).send("Download updated."))
        .catch((err) => res.status(404).send("Error: " + err));
}
//-----------------------------------------------------------------------
exports.deleteDownload = async (req, res) => {
    Download.findByIdAndUpdate(req.params.id, { $set: { show: false } })
        .then(() => res.status(200).send("Download deleted."))
        .catch((err) => res.status(404).send("Error: " + err));
};

exports.showallDownload = async (req, res) => {
    Download.find().sort({updatedAt: -1})
        .then((download) => res.status(200).send(download))
        .catch((err) => res.status(404).send("Error: " + err));
};

exports.getCategoryDownload = async (req, res) => {
      return  Download.find({category: req.params.category})
            .then((download) => res.status(200).send(download))
            .catch((err) => res.status(400).send("Error: " + err));
    
}