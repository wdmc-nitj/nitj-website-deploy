const majorProgramme = require("../../models/admissions/majorProgramme.js");

const getProgrammeByCategory = (req,res) => {
    
    const {category, subCategory} = req.query;
    const {visible} = req.params;
    const filter = {};
    
    // res.header("Access-Control-Allow-Origin", "*");

    if(visible === "visible")
        filter.visible = true;
    else if(visible === "hidden")
        filter.visible = false;
    else if(visible !== "all")
    {
        return res.status(400).json("Invalid value for visible, must be in [hidden, visible, all]");
    }

    if(category && category !== "all")
    {
        const validCategories = ["Undergraduate Programme", "Post Graduate and Research Programme", "PhD Programme", "PG Diploma in Engineering Programme"];
        
        if(!validCategories.includes(category))
        {
            return res.status(400).json("Invalid value for category, must be in [Undergraduate Programme, Post Graduate and Research Programme, PhD Programme, PG Diploma in Engineering Programme];");
        }

        filter["category.category"]=category;
    }

    if(subCategory && subCategory !== "all")
    {
        const validSubCategories = ["CCMT", "Self-Sponsored", "MSc", "MBA", "PG Diploma in Management"];

        if(!validSubCategories.includes(subCategory))
        {
            return res.status(400).json("Invalid value for subCategory, must be in [CCMT, Self-Sponsored, MSc, MBA, PG Diploma in Management]");
        }
        
        filter["category.subCategory"]=subCategory;
    }


    majorProgramme.find(filter)
        .sort({isComment: 1, nameOfProgrammeOrComment: 1})
        .then(programme => {
            if(programme.length === 0 || (programme[0].isComment === true && programme[0].visible === false))
            {
                const response = {
                    nameOfProgrammeOrComment: `The Institute offers ${category}s in all the departments in various disciplines.`,
                    isComment: true
                }
                return res.json([response]);
            }    
            
            if(programme[0].isComment === true)
            {
                return res.json([programme[0]]);
            }
            
            const onlyProgramme = programme.filter(data => data.isComment === false);

            
            return res.json(onlyProgramme);
        })
        .catch(err => res.status(400).json(err));
}

module.exports.getProgrammeByCategory = getProgrammeByCategory;