module.exports = (sequelize, Sequelize) => {
    const SkillCategory =
    sequelize.define("skill_categories",
    {
        name: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'skill_categories'
    }
    );
    return SkillCategory;
}