const administration = require("./../models/administration");

exports.addAdministration = async (req, res) => {
    if (req.body?.name === undefined || req.body?.designation === undefined) {
        return res.status(400).send("Error: Name and Designation are required");
    }

    admin = new administration({
        name: req.body?.name,
        designation: req.body?.designation,
        department: req.body?.department,
        profileLink: req.body?.profileLink,
        qualification: {
            degree: req.body?.qualification?.degree,
            university: req.body?.qualification?.university,
            year: req.body?.qualification?.year,
        },
        image: req.body?.image,
        sourceOfInfo: {
            name: req.body?.sourceOfInfo?.name,
            email: req.body?.sourceOfInfo?.email,
            designation: req.body?.sourceOfInfo?.designation,
            department: req.body?.sourceOfInfo?.department,
        },
        contact: {
            email: req.body?.contact?.email,
            telNo: req.body?.contact?.telNo,
            EPABX: req.body?.contact?.EPABX,
            Extn: req.body?.contact?.Extn,
            fax: req.body?.contact?.fax,
        },
        messageTxt: req.body?.messageTxt,
    });

    admin
        .save()
        .then(() => res.status(200).send(admin))
        .catch((err) => res.status(500).send("Error: " + err));
};

//----------------------------------------------------------------------->
exports.getAdministration = async (req, res) => {
    if (req.query.id !== undefined) {
        administration
            .find({ _id: req.query.id })
            .then((administration) => res.status(200).send(administration))
            .catch((err) => res.status(404).send("Error: " + err));
    } else {
        administration
            .find({ show: true })
            .then((administration) => res.status(200).send(administration))
            .catch((err) => res.status(404).send("Error: " + err));
    }
};

//----------------------------------------------------------------------->
exports.deleteAdministration = async (req, res) => {
    administration
        .findByIdAndUpdate(req.params.id, {
            $set: {
                show: false,
            },
        })
        .then((administration) => res.status(200).send(administration))
        .catch((err) => res.status(400).send("Error: " + err));
};

//----------------------------------------------------------------------->
exports.getAdministrationall = async (req, res) => {
    if (req.body.showDeleted) {
        administration
            .find()
            .then((administration) => res.status(200).send(administration))
            .catch((err) => res.status(404).send("Error: " + err));
    } else {
        administration
            .find({ show: true })
            .then((administration) => res.status(200).send(administration))
            .catch((err) => res.status(404).send("Error: " + err));
    }
};

//----------------------------------------------------------------------->
exports.updateAdministration = async (req, res) => {
    administration
        .findByIdAndUpdate(req.params.id, {
            name: req.body?.name,
            designation: req.body?.designation,
            department: req.body?.department,
            profileLink: req.body?.profileLink,
            qualification: {
                degree: req.body?.qualification?.degree,
                university: req.body?.qualification?.university,
                year: req.body?.qualification?.year,
            },
            image: req.body?.image,
            sourceOfInfo: {
                name: req.body?.sourceOfInfo?.name,
                email: req.body?.sourceOfInfo?.email,
                designation: req.body?.sourceOfInfo?.designation,
                department: req.body?.sourceOfInfo?.department,
            },
            contact: {
                email: req.body?.contact?.email,
                telNo: req.body?.contact?.telNo,
                EPABX: req.body?.contact?.EPABX,
                Extn: req.body?.contact?.Extn,
                fax: req.body?.contact?.fax,
            },
            messageTxt: req.body?.messageTxt,
        })
        .then(() => res.status(200).send("administration Updated Successfully!"))
        .catch((err) => res.status(404).send("Error: " + err));
};
