const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Server = new Schema(
    {
        hostname: {type: String, required: true },
        os: { type: String, required: true},
        used: { type: Boolean, required: true},
        user: { type: String }
    },
    {   timestamps: {} 
    }    
)

module.exports = mongoose.model('server', Server)