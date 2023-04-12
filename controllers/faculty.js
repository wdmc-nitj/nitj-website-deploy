const Faculty = require('../models/Faculty')
const Sessions = require('../models/Session');

const getAllFaculty = async (req, res) => {
    try {
        const result = await Faculty.find({ show: true },).sort({order:1}).select("-password");
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByIdFaculty = async (req, res) => {
    try {
        const result = await Faculty.find({ _id: req.params.id }).select("-password");
        res.status(200).json({ data: result, validation: {status:req.user} });
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByDeptFaculty = async (req, res) => {
    try {
        const result = await Faculty.find({ show: true, department: req.params.dept }).sort({order:1}).select("-password");
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const addFaculty = async (req, res) => {
    const faculty = new Faculty({ ...req.body, department: req.params.dept });

    try {
        const result = await faculty.save();
        res.status(201).json("Successfully inserted")
    } catch (error) {
        res.status(400).json("Error: " + error);

    }
}

const deleteFaculty = async (req, res) => {
    try {
        const result = await Faculty.findByIdAndUpdate(req.params.id, { $set: { show: false } });
        res.status(200).json("Faculty deleted succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);

    }
}

const updateFaculty = async (req, res) => {
    try {

        if(req.user){
            const result = await Faculty.findById(req.params.id);
            await result.update({[req.query.q]:req.body});
            return res.status(200).json("Faculty updated succesfully")
        }
        return res.status(401).json("Faculty not Updated");
    } catch (error) {
        console.log(error);
        res.status(400).json("Error: " + error);

    }
}

module.exports = { getAllFaculty, getByDeptFaculty, getByIdFaculty, updateFaculty, deleteFaculty, addFaculty }
