const express = require('express');
const logger = require('morgan');

const app = express();
const port = process.env.PORT || '8900';

const employeeRouter = require('./routes/employees');
const skillRouter = require('./routes/skills');
const systemRoleRouter = require('./routes/systemRole');
const jobRoleRouter = require('./routes/jobRole');
const skillCategoryRouter = require('./routes/skillCategory');
KAN-40---Get-USER-by-ID
// const toolsRouter = require('./routes/tools');
// const toolCategoryRouter = require('./routes/toolCategory');
=======
//const toolsRouter = require('./routes/tools');
//const toolCategoryRouter = require('./routes/toolCategory');
main

const utilities = require('./utilities/utility');

app.use(express.json());
app.use(logger('dev'));

app.set('port', port); 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 

KAN-40---Get-USER-by-ID
app.use("/api/employees", employeeRouter);
app.use("/api/skills", skillRouter);
app.use("/api/systemRole", systemRoleRouter);
app.use("/api/jobRole", jobRoleRouter);
app.use("/api/skillCategory", skillCategoryRouter);
// app.use("/api/tools", toolsRouter);
// app.use("/api/toolCategory", toolCategoryRouter);

app.use((req, res) =>
    utilities.formatErrorResponse(res, 400, "End point not recognised")
);
=======

app.use("/api/employees", employeeRouter);
app.use("/api/skills", skillRouter);
app.use("/api/systemRole", systemRoleRouter);
app.use("/api/jobRole", jobRoleRouter);
app.use("/api/skillCategory", skillCategoryRouter);
//app.use("/api/tools", toolsRouter);
//app.use("/api/toolCategory", toolCategoryRouter);

app.use((req, res) => {
    utilities.formatErrorResponse(res, 400, "Endpoint not recognized");
});
main

module.exports = app;
