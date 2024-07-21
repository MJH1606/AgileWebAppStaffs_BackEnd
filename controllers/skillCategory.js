const router = require('../routes/skillCategory');
const utilities = require('../utilities/utility');
const db = require('../models');
let { getById } = require('./skills');

const SkillCategory = db.skillCategory;

getAll = async (req, res) =>{
    const skillCategory = await SkillCategory.findAll({
        order:['id']
    });
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

getByCategory = async (req, res) => {
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

create = async (req, res) =>{
    var skillCategory = {
        name: req.body.name,
    };
    try{
        if (skillCategory.name==null ||
        skillCategory.name.length <1){
        throw new Error("Essential fields missing");
        }
        skillCategory = await SkillCategory.create(skillCategory);
        res.status(201).json(skillCategory);
    } catch (error){
        if (error.name === 'SequelizeUniqueConstraintError') {
            utilities.formatErrorResponse(res, 400,error.message);
        } else {
            utilities.formatErrorResponse(res, 400,error.message);
        }
    }
};

deleting = async (req, res) =>{
    const id =req.body.id;
    try{
        const deleted = await SkillCategory.destroy({where: { id: id }});
        if (deleted==0) {
            throw new Error("Id not found");
        }
        res.status(200).send("Skill Category deleted");
    } catch(error){
        utilities.formatErrorResponse(res,404,error.message);
    }
};

update = async (req, res) =>{
    const id =req.body.id;
    const skillCategory = {
        name: req.body.name
    };
    try{
        if (id==null ||
        skillCategory.name==null){
            throw new Error("Missing essential fields");
        }
        await SkillCategory.update(skillCategory,
            {where: { id: id }}
        );
        res.status(200).json(skillCategory);
    }
    catch (error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}

module.exports = {getAll, getById, getByCategory, create, deleting, update}