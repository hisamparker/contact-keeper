const express = require('express');
const router = express.Router();

// this is our crud route so it'll have the most routes
// SIGNTAURE TYPE ENDPOINT
// @route       GET api/contacts
// @desc        get user's contacts
// @access      private (theses are all private to user so all private)
// we said anything that goes to this file is coming from /api/auth so we just need a slash
router.get('/', (req, res) => {
    res.send(`Get all the user's contacts`)
})

// SIGNTAURE TYPE ENDPOINT
// @route       POST api/contacts
// @desc        add a new contact
// @access      private 
router.post('/', (req, res) => {
    res.send(`Add a new contact`)
})

// SIGNTAURE TYPE ENDPOINT
// @route       PUT api/contacts/:id (we need to id which contact is getting updated)
// @desc        update contact
// @access      private 
router.put('/:id', (req, res) => {
    res.send(`Update a contact`)
})

// SIGNTAURE TYPE ENDPOINT
// @route       DELETE api/contacts/:id (we need to id which contact is getting deleted)
// @desc        delete contact
// @access      private 
router.delete('/:id', (req, res) => {
    res.send(`DESTROY a contact`)
})

// export router so we can access ittttt
module.exports = router