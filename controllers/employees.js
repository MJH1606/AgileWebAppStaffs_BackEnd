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
                },
                {
                    model: Employee,
                    as: 'manager',
                    attributes: ['id', 'first_name', 'surname'],
                    required: false 
                }
            ],
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
                },
                {
                    model: Employee,
                    as: 'manager',
                    attributes: ['id', 'first_name', 'surname'],
                    required: false 
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
                },
                {
                    model: Employee,
                    as: 'manager',
                    attributes: ['id', 'first_name', 'surname'],
                    required: false 
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

const getBySystemRole = async (req, res) => {
    const systemRole = req.params.systemRole;

    if (!systemRole) {
        return res.status(400).json({ message: 'System role parameter is missing' });
    }

    try {
        const employees = await Employee.findAll({
            include: [
                {
                    model: SystemRole,
                    as: 'system_role',
                    attributes: ['id', 'role'],
                    required: true,
                    where: { role: systemRole }
                },
                {
                    model: JobRole,
                    as: 'job_role',
                    attributes: ['id', 'role'],
                    required: true
                },
                {
                    model: Employee,
                    as: 'manager',
                    attributes: ['id', 'first_name', 'surname'],
                    required: false 
                }
            ],
            order: ['id']
        });

        if (employees.length === 0) {
            throw new Error(`Unable to find employees with system role ${systemRole}`);
        }

        res.status(200).json(employees);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



module.exports = {
    getAll,
    getByJobRole,
    getById,
    getBySystemRole,
};
