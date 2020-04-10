const mongoose = require('mongoose')

// Assign environment variables
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/serverdb"

// connect options
const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}

mongoose
    .connect (mongoUri, options )
    .catch( e=> {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db