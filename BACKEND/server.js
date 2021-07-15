//require express
const express = require('express');

//init express
const app = express();

// use express get method, pass in the route and the response
app.get('/', (req, res) => {
    res.json({ msg: "oh hai there"})
})

//define and require routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

//tell express to listen with the listen method and give it a port var from our .env
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`the walls have ears, the hills have eyes ${PORT}`))