//[SECTION] Dependencies and Modules
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Enrollment = require('../models/Enrollment')
const auth = require('../auth');

const { errorHandler } = auth;

//[SECTION] Check if the email already exists

module.exports.checkEmailExists = (req, res) => {
    // Check if the email from the request body contains an "@" symbol.
    if(req.body.email.includes("@")){
        return User.find({ email : req.body.email })
        .then(result => {
            // Mini-Activity: add status code
            if (result.length > 0) {
                return res.status(409).send({ message: "Duplicate email found" });
            } else {
                return res.status(404).send({ message: "No duplicate email found" });
            };
        })
        .catch(error => errorHandler(error, req, res))
    }else{
        // If the email from the request body does not contain an "@", send a 400 (Bad Request) status with "false" to indicate valid input
        res.status(400).send({ message: "Invalid email format" });
    }
};


//[SECTION] User registration
module.exports.registerUser = (req, res) => {
    // Checks if the email is in the right format
    if (!req.body.email.includes("@")){
        return res.status(400).send({ message: 'Invalid email format' });
    }
    // Checks if the mobile number has the correct number of characters
    if (req.body.mobileNo.length !== 11){
        return res.status(400).send({ message: 'Mobile number is invalid' });
    }
    // Checks if the password has atleast 8 characters
    else if (req.body.password.length < 8) {
        return res.status(400).send({ message: 'Password must be at least 8 characters long' });
    // If all needed requirements are achieved
    } else {
        let newUser = new User({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            mobileNo : req.body.mobileNo,
            password : bcrypt.hashSync(req.body.password, 10)
        })

        return newUser.save()
        .then((result) => res.status(201).send({
            message: 'User registered successfully',
            user: result
        }))
        .catch(error => errorHandler(error, req, res));
    }
};

//[SECTION] User authentication
module.exports.loginUser = (req, res) => {
    let { email, password } = req.body;

    if (!email.includes("@") || !email.includes(".")) {
        return res.status(400).send({message:'Invalid email format'});
    }

    User.findOne({ email })
    .then(user => {
        if (!user) {
            return res.status(404).send({message:'No email found'});
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).send({message: 'Incorrect email or password'});
        }

        return res.status(200).send({ message: "User logged in successfully", access: auth.createAccessToken(user) });
    })
    .catch(error => errorHandler(error, req, res));
};


//[Section] Activity: Retrieve user details
/*
    Steps:
    1. Retrieve the user document using it's id
    2. Change the password to an empty string to hide the password
    3. Return the updated user record
*/
module.exports.getProfile = (req, res) => {
    User.findById(req.user.id)
    .then(user => {
        if (!user) {
            return res.status(404).send("User not found");
        }
        user.password = "";
        res.status(200).send(user);
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.getEnrollments = (req, res) => {
    return Enrollment.find({userId : req.user.id})
    .then(enrollments => {
        if (enrollments.length > 0) {
            return res.status(200).send(enrollments);
        }
        return res.status(404).send({
            message: 'No enrolled courses'
        });
    })
    .catch(error => errorHandler(error, req, res));
};
