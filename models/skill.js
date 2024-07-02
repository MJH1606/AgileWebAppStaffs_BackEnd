module.exports = (sequelize, Sequelize) => {
    const Skill = sequelize.define("skill",
    {
        name: {
        type: Sequelize.STRING,
        primaryKey: true
        },
        category: {
        type: Sequelize.INTEGER
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'skill'
    }
    );
    //Tool.belongsTo(toolCategory,
    //    {foreignKey: 'tool_category_id'});
        
    return Skill;
};