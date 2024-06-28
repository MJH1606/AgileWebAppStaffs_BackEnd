module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee",
    {
        username: {
        type: Sequelize.STRING
        },
        password: {
        type: Sequelize.STRING
        },
        system_role: {
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
    //Tool.belongsTo(toolCategory,
    //    {foreignKey: 'tool_category_id'});
        
    return Employee;
};