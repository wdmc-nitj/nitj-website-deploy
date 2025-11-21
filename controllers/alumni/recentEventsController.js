const {recentEventModel}  = require("../../models/alumni/alumni");

const getNew = async(req,res)=>{
    try{
    const events = await recentEventModel.find({active: true, show:true});
    res.status(200).json(events);
    }
    catch(e){
        res.status(400).json({
            Error: e
        })
    }
}

const getAll = async(req,res)=>{
    try{
        const events = await recentEventModel.find({ show: true});
        res.status(200).json(events);
    }
    catch(e){
        res.status(400).json({
            Error:e
        })
    }
}

module.exports = {getNew, getAll};