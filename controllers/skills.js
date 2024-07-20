const router = require("../routes/employees");
const utilities = require("../utilities/utility");
const db = require("../models");


const Skill = db.skill;
const SkillCategory = db.skillCategory;

getAll = async (req, res) => {
    const skill = await Skill.findAll({
        order:['name'],
        include: [{
        model: SkillCategory,
        required: true
        }]
        }
    );
    res.status(200).json(skill);
};

getByName = async (req, res) => {
    const name = req.params.value;
    try {
        const skill = await Skill.findAll({ where: { name: name },
            include: [{
            model: SkillCategory,
            required: true}] });
    if (skill.length == 0) {
        throw new Error("Unable to find Skill with name " + name);
    }
    res.status(200).json(skill);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

getByCategory = async (req, res) => {
    const categoryName = req.params.category;
    try {
        // Find the category by name
        const category = await SkillCategory.findOne({ where: { name: categoryName } });
        if (!category) {
            throw new Error("Unable to find SkillCategory with name " + categoryName);
        }
        
        // Use the category ID to find skills
        const skills = await Skill.findAll({
            where: { category: category.id },
            include: [{
                model: SkillCategory,
                required: true
            }]
        });
        
        if (skills.length === 0) {
            throw new Error("No skills found in category " + categoryName);
        }

        res.status(200).json(skills);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};


create = async (req, res) =>{
    var skill = {
        name: req.body.name,
        category: req.body.category
    };
    try{
        if (skill.name==null ||
        skill.name.length <1 ||
        skill.category==null){
        throw new Error("Essential fields missing");
        }
        skill = await Skill.create(skill);
        res.status(201).json(skill);
    } catch (error){
        utilities.formatErrorResponse(res, 400,error.message);
    }
};

deleting = async (req, res) =>{
    const name =req.body.name;
    try{
        const deleted = await Skill.destroy({where: { name: name }});
        if (deleted==0) {
            throw new Error("Name not found");
        }
        res.status(200).send("Skill deleted");
    } catch(error){
        utilities.formatErrorResponse(res,404,error.message);
    }
};

update = async (req, res) =>{
    const name =req.body.name;
    const skill = {
        category: req.body.category
    };
    try{
        if (name==null ||
        skill.category==null){
            throw new Error("Missing essential fields");
        }
        await Skill.update(skill,
            {where: { name: name }}
        );
        res.status(200).json(skill);
    }
    catch (error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}
/*
getById = async (req, res) => {
    const id = req.params.id;
    try {
        const tool = await Tool.findByPk(id,
            {include: [{model: ToolCategory, required: true}]});
        if (tool == null || tool.length == 0) {
        throw new Error("Unable to find Tool with id " + id);
        }
        res.status(200).json(tool);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};
*/
module.exports = { getAll, getByName,getByCategory, create, deleting, update};