const router = require("../routes/employees");
const utilities = require("../utilities/utility");
const db = require("../models");


const Employee = db.employee;
const SystemRole = db.systemRole
const JobRole = db.jobRole

const getAll = async (req, res) => {
    try {
        const employees = await Employee.findAll({
            order: ['id'],
            include: [
                {
                    model: SystemRole,
                    as: 'system_role',
                    required: true
                },
                {
                    model: JobRole,
                    as: 'job_role',
                    required: true
                }
            ]
        });
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getById = async (req, res) => {
    const id = req.params.id;
    try {
        const employee = await Employee.findByPk(id, {
            include: [
                {
                    model: SystemRole,
                    as: 'system_role',
                    attributes: ['id', 'role'],
                    required: true
                },
                {
                    model: JobRole,
                    as: 'job_role',
                    attributes: ['id', 'role'],
                    required: true
                }
            ]
        });

        if (!employee) {
            throw new Error(`Unable to find employee with id ${id}`);
        }

        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/*
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
*/
module.exports = { getAll, getById};
