// require mongoose
const mongoose = require('mongoose');
// require config file to access mongoURI 
const config = require('config');
// make our db the mongoURI
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
       await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('mongo db connected')
    } catch (err) {
        console.error(err)
        //exit with failure
        process.exit(1)
    }
}

module.exports = connectDB;