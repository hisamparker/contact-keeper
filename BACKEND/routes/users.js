const express = require('express');
const router = express.Router();
// bring in express validator
const { check, validationResult } = require('express-validator/check');
// bring in bcrypt
const bcrypt = require('bcryptjs');
// bring in jason web token, see notes below
const jwt = require('jsonwebtoken')

const config = require('config')
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
                // after we register the user, we want to log them in 
                // so we respond to them with a 'payload' a JWT https://jwt.io/
                // a JWT has 3 parts xxxxx.yyyyy.zzzzz
                // 1.the header (the algorithm and token type (jwt)) 
                // 2 the payload contains something called claims, claims are statements about an entity (user) and additional data a claim could be exp (expiration), 
                // example {
                //     "sub": "1234567890",
                //     "name": "John Doe",
                //     "admin": true
                // }
                // 3.the signature: take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that. oof!
                // The signature is used to verify the message wasn't changed along the way, and, in the case of tokens signed with a private key, it can also verify that the sender of the JWT is who it says it is.
                
                // specify the payload
                const payload = {
                    user: {
                        id: newUser.id
                    }
                }
                //sign it! passs in payload, secret from our config file, and options, and error!
                jwt.sign(payload, config.get('jwtSecret'), {
                    // how long they stay logged in 
                    expiresIn: 360000
                    // add the error, iff error, throw error else res with the token
                }, (err, token) => {
                    if (err) throw err;
                    // you can grab the toke and put it into jwt.io to see what's up!
                    res.json({token})
                }
                )

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