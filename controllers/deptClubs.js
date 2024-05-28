const Clubs = require("../models/departmentClubs");

const getAllClubs = async (req, res) => {
    try {
        const result = await Clubs.find({ show: true },).sort({order:1});
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByIdClubs = async (req, res) => {
    try {
        const result = await Clubs.find({ _id: req.params.id });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByDeptClubs = async (req, res) => {
    try {
        const q = req.query.q;

        let query = {department: req.params.dept};
        if(q){
            query= {...query,type:q};
        }
        const result = await Clubs.find({ show: true, ...query});
        res.status(200).json(result);
    } catch (error) {

        res.status(400).json("Error: " + error);
    }
}

module.exports = {getAllClubs,getByDeptClubs,getByIdClubs};