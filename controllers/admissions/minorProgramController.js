const minorProgramme = require("../../models/admissions/minorProgramme.js");

const getProgramme = (req,res) => {

    let {visible} = req.params;
    let filter = {};
    
    if(visible === "visible")
        filter.visible = true;
    else if(visible === "hidden")
        filter.visible = false;
    else if(visible !== "all")
    {
        res.status(400).json("Invalid value for visible, must be in [hidden, visible, all]");
        return;
    }

    minorProgramme.find(filter)
        .sort({nameOfProgramme: 1})
        .then(programme => res.json(programme))
        .catch(err => res.status(400).json(err));
}

module.exports.getProgramme = getProgramme;