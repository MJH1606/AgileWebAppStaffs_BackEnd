module.exports = (sequelize, Sequelize, toolCategory) => {
    const Tool = sequelize.define("tool",
    {
        description: {
        type: Sequelize.STRING
        },
        hire_price: {
        type: Sequelize.DOUBLE
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'tool'
    }
    );
    Tool.belongsTo(toolCategory,
        {foreignKey: 'tool_category_id'});
        
    return Tool;
};