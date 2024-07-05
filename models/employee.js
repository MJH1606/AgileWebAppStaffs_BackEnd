module.exports = (sequelize, Sequelize, systemRole) => {
    const Employee = sequelize.define("employee",
    {
        username: {
        type: Sequelize.STRING
        },
        password: {
        type: Sequelize.STRING
        },
        system_role_id: {
            type: Sequelize.INTEGER
        },
        job_role: {
            type: Sequelize.INTEGER
        },
        first_name: {
            type: Sequelize.STRING
        },
        surname: {
            type: Sequelize.STRING
        },
        managed_by: {
            type: Sequelize.INTEGER
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'employee'
    }
    );
    Employee.belongsTo(systemRole,
        {foreignKey: 'system_role_id'});
        
    return Employee;
};