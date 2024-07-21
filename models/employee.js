module.exports = (sequelize, Sequelize, systemRole, jobRole) => {
    const Employee = sequelize.define("employee", {
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        system_role_id: {
            type: Sequelize.INTEGER
        },
        job_role_id: {
            type: Sequelize.INTEGER
        },
        first_name: {
            type: Sequelize.STRING
        },
        surname: {
            type: Sequelize.STRING
        },
        managed_by: {
            type: Sequelize.INTEGER,
            references: {
                model: 'employee',
                key: 'id'
            }
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'employee'
    });

    Employee.belongsTo(systemRole, { foreignKey: 'system_role_id' });
    Employee.belongsTo(jobRole, { foreignKey: 'job_role_id' });

    
    Employee.belongsTo(Employee, { as: 'manager', foreignKey: 'managed_by' });
    Employee.hasMany(Employee, { as: 'staff', foreignKey: 'managed_by' });

    return Employee;
};