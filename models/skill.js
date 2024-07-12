module.exports = (sequelize, Sequelize, skillCategory) => {
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
    Skill.belongsTo(skillCategory,
        {foreignKey: 'category'});
        
    return Skill;
};