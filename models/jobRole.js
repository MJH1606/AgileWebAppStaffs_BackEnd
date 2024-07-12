module.exports = (sequelize, Sequelize) => {
    const JobRole = sequelize.define("job_role",
    {
        role: {
        type: Sequelize.STRING
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'job_role'
    }
    );
        
    return JobRole;
};