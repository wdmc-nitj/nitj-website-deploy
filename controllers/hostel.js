const hostel = require("./../models/hostel");
//----------------------------------->

//----------------------------------------------------------------------->
exports.addHostel = async (req, res) => {
    const Hostel = new hostel(req.body);
    Hostel.save()
        .then(() => res.status(201).json(Hostel))
        .catch((err) => res.status(500).json("Error: " + err));
};

//----------------------------------------------------------------------->
exports.getHostel = async (req, res) => {
    hostel
        .find({ show: true, _id: req.params.id })
        .then((hostel) => res.status(200).json(hostel))
        .catch((err) => res.status(404).json("Error: " + err));
};

//----------------------------------------------------------------------->
exports.deleteHostel = async (req, res) => {
    hostel
        .findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    show: false,
                },
            },
            { useFindAndModify: false }
        )
        .then((hostel) => res.status(200).json(hostel))
        .catch((err) => res.status(400).json("Error: " + err));
};

//----------------------------------------------------------------------->
exports.getHostelall = async (req, res) => {
    if (req.body.showDeleted) {
        hostel
            .find()
            .then((hostel) => res.status(200).json(hostel))
            .catch((err) => res.status(404).json("Error: " + err));
    } else {
        hostel
            .find({ show: true })
            .then((hostel) => res.status(200).json(hostel))
            .catch((err) => res.status(404).json("Error: " + err));
    }
};

//----------------------------------------------------------------------->
exports.updateHostel = async (req, res) => {
    hostel
        .findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
        .then(() => res.status(200).json("hostel Updated Successfully!"))
        .catch((err) => res.status(404).json("Error: " + err));
};
