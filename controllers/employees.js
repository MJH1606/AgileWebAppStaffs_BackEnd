const db = require('../models');
const Employee = db.employee;
const SystemRole = db.systemRole;
const JobRole = db.jobRole;

const getAll = async (req, res) => {
    try {
        const employees = await Employee.findAll({
            order: ['id'],
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
            ],
        });
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getByJobRole = async (req, res) => {
    const jobRole = req.params.role;
    try {
        const employees = await Employee.findAll({
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
                    required: true,
                    where: { role: jobRole }
                }
            ],
            order: ['id'],
            
        });

        if (employees.length === 0) {
            throw new Error(`Unable to find employees with job role ${jobRole}`);
        }

        res.status(200).json(employees);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const createEmployee = async (req,res) => {
    const {username, password, system_role_id, job_role_id, first_name, surname, managed_by} = req.body;
    try {
        const newEmployee = await Employee.create({
            username,
            password,
            system_role_id,
            job_role_id,
            first_name,
            surname,
            managed_by
        });
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};

module.exports = {
    getAll,
    getByJobRole,
    createEmployee
};
