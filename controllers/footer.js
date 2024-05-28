const Footer = require("../models/footer");

exports.addFooter = async (req, res) => {
    const footer = new Footer({
        links: req.body?.links,
        sourceOfInfo: {
            name: req.body?.sourceOfInfo?.name,
            email: req.body?.sourceOfInfo?.email,
            designation: req.body?.sourceOfInfo?.designation,
            department: req.body?.sourceOfInfo?.department,
        },
        order: req.body?.order,

    });

    footer
        .save()
        .then(() => res.status(201).json(footer))
        .catch((err) => res.status(400).json("Error: " + err));
};

//----------------------------------------------------------------------->
exports.getFooter = async (req, res) => {
    if(req.query.id !== undefined){
        Footer.find({_id: req.params.id })
            .then((result) => res.status(200).json(result))
            .catch((err) => res.status(404).json("Error: " + err));
    }
    else{
        Footer.find({ show: true })
            .then((result) => res.status(200).json(result))
            .catch((err) => res.status(404).json("Error: " + err));
    }
};

exports.updateFooter = async (req, res) => {
    const id = req.params.id;
    Footer.findByIdAndUpdate(id, {
        links: req.body?.links,
        sourceOfInfo: {
            name: req.body?.sourceOfInfo?.name,
            email: req.body?.sourceOfInfo?.email,
            designation: req.body?.sourceOfInfo?.designation,
            department: req.body?.sourceOfInfo?.department,
        },
        order: req.body?.order,
        
    })
        .then(() => res.status(200).json("Updated Successfully!"))
        .catch((err) => res.status(404).json("Error: " + err));
};

exports.deleteFooter = async (req, res) => {
    const id = req.params.id;
    Footer.findByIdAndUpdate(id, {
        $set: { show: false },
    })
        .then(() => res.status(200).json("Deleted Successfully!"))
        .catch((err) => res.status(404).json("Error: " + err));
};

exports.getFooterAll = async (req, res) => {
    Footer.find({})
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(404).json("Error: " + err));
};
