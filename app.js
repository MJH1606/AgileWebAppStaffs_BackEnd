const express = require('express');
const logger = require('morgan');


const app = express();
const port = process.env.PORT || '8900';

const employeeRouter = require('./routes/employees')
const toolsRouter = require('./routes/tools');
const toolCategoryRouter = require('./routes/toolCategory');

const utilities = require('./utilities/utility');
app.use(express.json());
app.use(logger('dev'));

app.set('port', port); //Port to listen on
app.listen(port); //Start the server

app.use("/api/employees", employeeRouter)
app.use("/api/tools", toolsRouter);
app.use("/api/toolCategory",toolCategoryRouter);

app.use((req, res) =>

utilities.formatErrorResponse(res,400,
    "End point not recognised"));


module.exports = app;