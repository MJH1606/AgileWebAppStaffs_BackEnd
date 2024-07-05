module.exports = (sequelize, Sequelize) => {
    const SystemRole = sequelize.define("system_role",
    {
        role: {
        type: Sequelize.STRING
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'system_role'
    }
    );
        
    return SystemRole;
};