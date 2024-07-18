const router = require('../routes/skillCategory');
const utilities = require('../utilities/utility');
const db = require('../models');
let { getById } = require('./skills');


const SkillCategory = db.skillCategory;

getAll = async (req, res) =>{
    const skillCategory = await SkillCategory.findAll();
    res.status(200).json(skillCategory);
}

getById = async (req, res) =>{
    const id =req.params.id;
    try{
        const skillCategory = await SkillCategory.findByPk(id);
        if(skillCategory==null || skillCategory.length==0){
            throw new Error("Unable to find Skill with id " + id);
        }
        res.status(200).json(skillCategory);
    } catch(error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}

const getByCategory = async (req, res) => {
    const name = req.params.category;
    try {
        const skillCategory = await SkillCategory.findOne({ where: { name: name } });
        if (!skillCategory) {
            throw new Error(`Unable to find Skill Category ${name}`);
        }
        res.status(200).json(skillCategory);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};


module.exports = {getAll, getById, getByCategory}