const config = require("../config/config");
const Sequelize = require("sequelize");
const Employee = require("./employee");
const Skill = require("./skill");
const SystemRole = require("./systemRole");
const JobRole = require("./jobRole");

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD, {
        host: config.HOST,
        dialect: config.dialect,
        port: config.PORT
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.systemRole = SystemRole(sequelize, Sequelize);
db.jobRole = JobRole(sequelize, Sequelize);
db.employee = Employee(sequelize, Sequelize, db.systemRole, db.jobRole);
db.skill = Skill(sequelize, Sequelize);

module.exports = db;
