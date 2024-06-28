const router = require('../routes/toolCategory');
const utilities = require('../utilities/utility');
const db = require('../models');
let { getById } = require('./tools');


const ToolCategory = db.toolCategory;

getAll = async (req, res) =>{
    const toolCategory = await ToolCategory.findAll();
    res.status(200).json(toolCategory);
}

getById = async (req, res) =>{
    const id =req.params.id;
    try{
        const toolCategory = await ToolCategory.findByPk(id);
        if(toolCategory==null || toolCategory.length==0){
            throw new Error("Unable to find Tool with id " + id);
        }
        res.status(200).json(toolCategory);
    } catch(error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}

module.exports = {getAll, getById}