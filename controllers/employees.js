const router = require("../routes/employees");
const utilities = require("../utilities/utility");
const db = require('../models');
const Employee = db.employee;
const SystemRole = db.systemRole;
const JobRole = db.jobRole;
const sequelize = db.sequelize;
const jwt = require('jsonwebtoken');


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

const getSkillsByEmployeeId = async (req, res) => {
    const id = req.params.id;

    try {
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ message: `Employee with id ${id} not found` });
        }

        const skillDetails = await sequelize.query(`
            SELECT skill, level, expiration, notes
            FROM employee_skill_details
            WHERE employee = :employeeId
        `, {
            replacements: { employeeId: id },
            type: sequelize.QueryTypes.SELECT
        });

        res.status(200).json({ employeeId: id, skills: skillDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
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

deleteEmployee = async (req, res) => {
    const id = req.body.id;
    try {
        const numDeleted = await Employee.destroy({
            where: { id: id }
        });

        if (numDeleted === 0) {
            throw new Error(`Unable to find employee with id ${id}`);
        }

        res.status(200).json({ message: `Employee with id ${id} deleted successfully` });
    } catch (error) {
        utilities.formatErrorResponse(res,404,error.message);
    }
};

updateEmployee = async (req, res) => {
    const { id, username, password, system_role_id, job_role_id, first_name, surname, managed_by } = req.body;

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

const updateSkillDetails = async (req, res) => {
    const { id, skill } = req.params;
    const { level, expiration, notes } = req.body;
    if (level == null) {
        return res.status(400).json({ message: 'Invalid level' });
    }

    if (expiration && isNaN(Date.parse(expiration))) {
        return res.status(400).json({ message: 'Invalid expiration date' });
    }

    try {
        const [result] = await sequelize.query(`
            UPDATE employee_skill_details
            SET level = :level,
                expiration = :expiration,
                notes = :notes
            WHERE employee = :employeeId AND skill = :skill
        `, {
            replacements: {
                employeeId: id,
                skill,
                level,
                expiration: expiration || null,
                notes: notes || null
            }
        });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Skill not found for employee with id ${id}` });
        }

        res.status(200).json({ message: 'Skill details updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const deleteSkillDetails = async (req, res) => {
    const { id, skill } = req.params;

    try {
        const [result] = await sequelize.query(`
            DELETE FROM employee_skill_details
            WHERE employee = :employeeId AND skill = :skill
        `, {
            replacements: {
                employeeId: id,
                skill
            }
        });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Skill not found for employee with id ${id}` });
        }

        res.status(200).json({ message: 'Skill deleted successfully' });
    } catch (error) {
        console.error(error);
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

const getUserInfo = async (req, res) => {
    const authHeader = req.headers.authorization; //looking for our header
    var token
    if (authHeader) { //Should contain “Bearer ” followed by the token
        token = authHeader.split(' ')[1];//retrieve value after space
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        // Send the user info (decoded from the token)
        return res.json({
            id: decoded.id,
            systemRole: decoded.systemRole,
            username: decoded.username
        });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    } else {
            res.sendStatus(404);
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
    getSkillsByEmployeeId,
    addSkillToEmployee,
    updateSkillDetails,
    deleteSkillDetails,
    getUserInfo
};

