const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const config = require('config')
const User = require('../models/User')
const auth = require('../middleware/auth')

// SIGNTAURE TYPE ENDPOINT
// @route       GET api/auth
// @desc        get logged i user
// @access      private (they are logged in)
// we said anything that goes to this file is coming from /api/auth so we just need a slash
// add auth middleware to the route to check that user is logged in
router.get('/', auth, (req, res) => {
    res.send('Get logged in user')
})

// SIGNTAURE TYPE ENDPOINT
// @route       POST api/auth
// @desc        authorize user and get token
// @access      public (before they loggin, they're getting access)
router.post('/', [
    check('email', 'Please enter correct email').isEmail(),
    check('password', 'Please enter correct passwork').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const { email, password } = req.body;
    try {
        let currentUser = await User.findOne({ email });
        
        if(!currentUser) {
            return res.status(400).json({ msg: 'User not found, please check' })
        }

        const isMatch = await bcrypt.compare(password, currentUser.password);
        if(!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' })
        }

        const payload = {
            user: {
                id: currentUser.id
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

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

})

// export router so we can access ittttt
module.exports = router