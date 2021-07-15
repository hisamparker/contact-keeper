//require express
const express = require('express');

//init express
const app = express();

// use express get method, pass in the route and the response
app.get('/', (req, res) => {
    res.json({ msg: "oh hai there"})
})

//tell express to listen with the listen method and give it a port var from our .env
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`the walls have ears, the hills have eyes ${PORT}`))