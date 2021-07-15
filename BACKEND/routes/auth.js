const express = require('express');
const router = express.Router();

// SIGNTAURE TYPE ENDPOINT
// @route       GET api/auth
// @desc        get logged i user
// @access      private (they are logged in)
// we said anything that goes to this file is coming from /api/auth so we just need a slash
router.get('/', (req, res) => {
    res.send('Get logged in user')
})

// SIGNTAURE TYPE ENDPOINT
// @route       POST api/auth
// @desc        authorize user and get token
// @access      public (before they loggin, they're getting access)
router.post('/', (req, res) => {
    res.send('Log the user in')
})

// export router so we can access ittttt
module.exports = router