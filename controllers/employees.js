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

const deleteEmployee = async (req, res) => {
    const id = req.params.id;
    try {
        const numDeleted = await Employee.destroy({
            where: { id }
        });

        if (numDeleted === 0) {
            throw new Error(`Unable to find employee with id ${id}`);
        }

        res.status(200).json({ message: `Employee with id ${id} deleted successfully` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateEmployee = async (req, res) => {
    const id = req.params.id;
    const { username, password, system_role_id, job_role_id, first_name, surname, managed_by } = req.body;

    try {
        const employee = await Employee.findByPk(id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        if (username) {
            employee.username = username;
        }
        if (password) {
            employee.password = password;
        }
        if (system_role_id) {
            employee.system_role_id = system_role_id;
        }
        if (job_role_id) {
            employee.job_role_id = job_role_id;
        }
        if (first_name) {
            employee.first_name = first_name;
        }
        if (surname) {
            employee.surname = surname;
        }
        if (managed_by) {
            employee.managed_by = managed_by;
        }

        await employee.save();
        res.status(200).json({ message: 'Employee updated successfully', employee });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createEmployee = async (req, res) => {
    const { username, password, system_role_id, job_role_id, first_name, surname, managed_by } = req.body;
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
        res.status(400).json({ message: error.message });
    }
};

const getByName = async (req, res) => {
    const { firstName, surname } = req.params;
    try {
        const employee = await Employee.findAll({
            where: {
                first_name: firstName,
                surname: surname
            },
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
                }
            ],
            order: ['id'],
        });

        if (employee.length === 0) {
            throw new Error(`Unable to find employees with name ${firstName} ${surname}`);
        }

        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    } 
};

module.exports = {
    getAll,
    getByJobRole,
    createEmployee, 
    getByName,       
    updateEmployee,  
    deleteEmployee,  
    getById
};
