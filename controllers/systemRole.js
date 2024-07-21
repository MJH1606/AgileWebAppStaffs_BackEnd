const router = require("../routes/systemRole");
const utilities = require("../utilities/utility");
const db = require("../models");


const SystemRole = db.systemRole;

getAll = async (req, res) => {
    const systemRole = await SystemRole.findAll(//{
    );
    res.status(200).json(systemRole);
};

module.exports = { getAll};