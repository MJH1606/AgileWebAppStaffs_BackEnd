const jwt = require('jsonwebtoken');

const db = require('../models');
const Employee = db.employee;
const SystemRole = db.systemRole;

const login = async (req, res) => {
    const userLoginDetails = {
        username: req.body.username,
        password: req.body.password
    };

    try {
        // Fetch user from the database by username
        const user = await Employee.findOne({
            where: {
                username: userLoginDetails.username
            },
            include: [
                {
                    model: SystemRole,
                    as: 'system_role',
                    attributes: ['id', 'role'],
                    required: true
                },
            ]
        });

        // Check if user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Username or password is incorrect'
            });
        }

        // Verify password using bcrypt
        if (userLoginDetails.password !== user.password) {
            return res.status(401).json({
                success: false,
                message: 'Username or password is incorrect'
            });
        }

        // Create JWT payload
        const tokenPayload = {
            id: user.id,
            username: user.username,
            systemRole: user.system_role_id
        };

        // Sign JWT and return it
        const accessToken = jwt.sign(tokenPayload, process.env.SECRET, { expiresIn: '1h' });

        return res.json({
            success: true,
            accessToken
        });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = {login}