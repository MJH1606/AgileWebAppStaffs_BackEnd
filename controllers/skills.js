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

deleting = async (req, res) =>{
    const id =req.body.id;
    try{
        const deleted = await Tool.destroy({where: { id: id }});
        if (deleted==0) {
            throw new Error("Id not found");
        }
        res.status(200).send("Tool deleted");
    } catch(error){
        utilities.formatErrorResponse(res,404,error.message);
    }
};

update = async (req, res) =>{
    const id =req.body.id;
    const tool = {
        description: req.body.description,
        hire_price: req.body.hire_price
    };
    try{
        if (id==null ||
        tool.description==null ||
        tool.hire_price==null){
            throw new Error("Missing essentialfields");
        }
        await Tool.update(tool,
            {where: { id: id }}
        );
        res.status(200).json(tool);
    }
    catch (error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}
*/
module.exports = { getAll, getByName, create};