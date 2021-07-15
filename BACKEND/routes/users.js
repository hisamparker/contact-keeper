const express = require('express');
const router = express.Router();
// bring in express validator
const { check, validationResult } = require('express-validator/check');
// bring in bcrypt
const bcrypt = require('bcryptjs');

const User = require('../models/User')

// define post request for posting data to server 
// SIGNTAURE TYPE ENDPOINT
// @route    POST api/users
// @description register a user
// @access public
// we said anything that goes to this file is coming from /api/users so we just need a slash
router.post('/', [
    // check that there is a name, name is not empty ... this just adds the checks
    check('name', 'Please add your name').not().isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({min:6})
], 
    async (req, res) => {
        // here we set the errors for our validation
        const errors = validationResult(req);
        // isEmpty is a method provided by express validator, so we check if there's something in erros and if there is, we do stuff
        if(!errors.isEmpty()) {
            // errors is the value oth the validationResult method with the argument of the request object, it gives us all the errors in an array
            return res.status(400).json({errors: errors.array()})
        }
        // get the name, email, and pw from the request object
        const {name, email, password} = req.body;
        
        try {
            // we want unique emails, so we check the db to see if the email is in our system
            let user = await User.findOne({ email });
            //if user is in the system, we send a 400 status
            if (user) {
                res.status(400).json({ msg: 'This email is already in use'})
            } else {
                // create a new user instance based on our schema
                newUser = new User({name, email, password})
                //encrypt the password, first we gen a salt, then we hash the password and the salt
                const salt = await bcrypt.genSalt(10)
                newUser.password = await bcrypt.hash(password, salt)
                // now we save user in db
                await newUser.save();

                res.send(`user saved`)
            }
        } catch (err) {
            console.error(err.message);
            //send the status and the message
            res.status(500).send(`Server error`)
        }
    }
)

// export router so we can access ittttt
module.exports = router