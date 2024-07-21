const db = require('../models');
const Employee = db.employee;
const SystemRole = db.systemRole;
const JobRole = db.jobRole;
const sequelize = db.sequelize;

// Helper function to get skills for a list of employees
const getSkillsForEmployees = async (employees) => {
    const [skillDetails] = await sequelize.query(`
        SELECT employee AS employee, skill, level
        FROM employee_skill_details
    `);

    return employees.map(employee => {
        const skills = skillDetails.filter(skill => skill.employee === employee.id);
        return {
            ...employee.toJSON(),
            skills
        };
    });
};

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
            ]
        });

        const employeesWithSkills = await getSkillsForEmployees(employees);

        res.status(200).json(employeesWithSkills);
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

        const [skillDetails] = await sequelize.query(`
            SELECT skill, level
            FROM employee_skill_details
            WHERE employee = :employeeId
        `, {
            replacements: { employeeId: id }
        });

        const employeeWithSkills = {
            ...employee.toJSON(),
            skills: skillDetails
        };

        res.status(200).json(employeeWithSkills);
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
            order: ['id']
        });

        const employeesWithSkills = await getSkillsForEmployees(employees);

        res.status(200).json(employeesWithSkills);
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

        const employeesWithSkills = await getSkillsForEmployees(employees);

        res.status(200).json(employeesWithSkills);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getByName = async (req, res) => {
    const { firstName, surname } = req.params;
    try {
        const employees = await Employee.findAll({
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
                    required: true
                }
            ],
            order: ['id']
        });

        if (employees.length === 0) {
            throw new Error(`Unable to find employees with name ${firstName} ${surname}`);
        }

        const employeesWithSkills = await getSkillsForEmployees(employees);

        res.status(200).json(employeesWithSkills);
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

const addSkillToEmployee = async (req, res) => {
    const { id } = req.params; 
    const { skill, level, expiration, notes } = req.body; 

    try {
       
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ message: `Employee with id ${id} not found` });
        }

        
        await sequelize.query(`
            INSERT INTO employee_skill_details (employee, skill, level, expiration, notes)
            VALUES (:employeeId, :skill, :level, :expiration, :notes)
        `, {
            replacements: {
                employeeId: id,
                skill,
                level,
                expiration: expiration || null,
                notes: notes || null
            }
        });

        res.status(201).json({ message: 'Skill  added successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAll,
    getByJobRole,
    createEmployee, 
    getByName,       
    updateEmployee,  
    deleteEmployee,  
    getById,
    getBySystemRole,
    addSkillToEmployee
};
