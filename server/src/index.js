const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./database')
const serverRouter = require('./routes/server-router')

const app = express()

// assign env variables
const apiPort = process.env.PORT || 4000


app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req,res) => {
    res.send('Hello World!')
})

app.use('/api', serverRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))

