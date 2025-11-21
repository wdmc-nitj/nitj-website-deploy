const {noticeModel}  = require("../../models/alumni/alumni");

const getNew = async(req,res)=>{
    try{
    const notice = await noticeModel.find({active: true, show:true});
    res.status(200).json(notice);
    }
    catch(e){
        res.status(400).json({
            Error: e
        })
    }
}

const getAll = async(req,res)=>{
    try{
        const notice = await noticeModel.find({show: true});
        res.status(200).json(notice);
    }
    catch(e){
        res.status(400).json({
            Error:e
        })
    }
}

module.exports = {getNew, getAll};