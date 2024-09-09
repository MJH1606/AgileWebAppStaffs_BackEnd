require("dotenv").config()
const express = require('express');
const logger = require('morgan');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || '8900';

const loginRouter = require('./routes/login')
const employeeRouter = require('./routes/employees');
const skillRouter = require('./routes/skills');
const systemRoleRouter = require('./routes/systemRole');
const jobRoleRouter = require('./routes/jobRole');
const skillCategoryRouter = require('./routes/skillCategory');

const utilities = require('./utilities/utility');

app.use(express.json());
app.use(logger('dev'));

app.set('port', port); 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 

//AuthenticateToken function – check request is from authenticated user – used by app.use functions for tools and toolsCategory below
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization; //looking for our header
    if (authHeader) { //Should contain “Bearer ” followed by the token
        const tokenReceived = authHeader.split(' ')[1];//retrieve value after space
        //Compare JWT token received with payload + SECRET
        jwt.verify(tokenReceived, process.env.SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(401);
            }
            req.user = user; //save user information into request
            next(); //invoke next middleware function (calling router)
        });
    } else {
        res.sendStatus(404);
    }
};
//Requests that need authorisation must call the authenticateToken function first
app.use("", loginRouter);
app.use("/api/employees", authenticateToken, employeeRouter);
app.use("/api/skills", authenticateToken, skillRouter);
app.use("/api/systemRole", authenticateToken, systemRoleRouter);
app.use("/api/jobRole", authenticateToken, jobRoleRouter);
app.use("/api/skillCategory", authenticateToken, skillCategoryRouter);

app.use((req, res) =>
    utilities.formatErrorResponse(res, 400, "End point not recognised")
);

module.exports = app;