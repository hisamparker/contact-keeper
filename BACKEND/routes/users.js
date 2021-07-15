const express = require('express');
const router = express.Router();

const user = require('../models/User')

// define post request for posting data to server 
// SIGNTAURE TYPE ENDPOINT
// @route    POST api/users
// @description register a user
// @access public
// we said anything that goes to this file is coming from /api/users so we just need a slash
router.post('/', (req, res) => {
    res.send(req.body)
})

// export router so we can access ittttt
module.exports = router