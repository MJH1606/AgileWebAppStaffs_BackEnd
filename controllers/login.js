const jwt = require('jsonwebtoken');

const login = (req, res) =>{
    const userLoginDetails = {
        username: req.body.username,
        password: req.body.password
    };


    //FAKE RECORD INFO - ACTUAL WILL BE RETURNED FROM DB
    const user = {
        firstName: "Celia",
        systemRole: "admin"
    }

    //TEMP - HARD CODED PW CHECK
    if (userLoginDetails.username == "user1"
        && userLoginDetails.password == "password1"
    ){
        const accessToken = jwt.sign( user, process.env.SECRET);

        res.json({
            accessToken
        });
    } else { //USERNAME AND PASSWORD DOES NOT MATCH
        res.status(401).json({
            success: false,
            message: 'username or password is incorrect'
        });
    }
}

module.exports = {login}