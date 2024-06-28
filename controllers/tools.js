const router = require("../routes/tools");
const utilities = require("../utilities/utility");
const db = require("../models");


const Tool = db.tool;

getAll = async (req, res) => {
    const tool = await Tool.findAll({
        order:['id'],
        include: [{
        model: ToolCategory,
        required: true
        }]
        });
    res.status(200).json(tool);
};

getByDesc = async (req, res) => {
    const desc = req.params.value;
    try {
        const tool = await Tool.findAll({ where: { description: desc },
            include: [{
            model: ToolCategory,
            required: true}] });
    if (tool.length == 0) {
        throw new Error("Unable to find Tool with description " + desc);
    }
    res.status(200).json(tool);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

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

create = async (req, res) =>{
    var tool = {
        description: req.body.description,
        hire_price: req.body.hire_price
    };
    try{
        if (tool.description==null ||
        tool.description.length <1 ||
        tool.hire_price==null){
        throw new Error("Essential fields missing");
        }
        tool = await Tool.create(tool);
        res.status(201).json(tool);
    } catch (error){
        utilities.formatErrorResponse(res, 400,error.message);
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

module.exports = { getAll, getByDesc, getById, create, deleting, update };
