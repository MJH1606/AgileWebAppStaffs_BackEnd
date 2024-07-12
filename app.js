const express = require('express');
const logger = require('morgan');


const app = express();
const port = process.env.PORT || '8900';

const employeeRouter = require('./routes/employees')
const skillRouter = require('./routes/skills')
const systemRoleRouter = require('./routes/systemRole')
const skillCategoryRouter = require('./routes/skillCategory')
//const toolsRouter = require('./routes/tools');
//const toolCategoryRouter = require('./routes/toolCategory');

const utilities = require('./utilities/utility');
app.use(express.json());
app.use(logger('dev'));

app.set('port', port); //Port to listen on
app.listen(port); //Start the server

app.use("/api/employees", employeeRouter)
app.use("/api/skills", skillRouter)
app.use("/api/systemRole", systemRoleRouter)
app.use("/api/skillCategory", skillCategoryRouter)
//app.use("/api/tools", toolsRouter);
//app.use("/api/toolCategory",toolCategoryRouter);

app.use((req, res) =>

utilities.formatErrorResponse(res,400,
    "End point not recognised"));


module.exports = app;