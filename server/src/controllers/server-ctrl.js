const Server = require('../models/server-model')

createServer = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a server',
        })
    }

    const server = new Server(body)

    if (!server) {
        return res.status(400).json({ success: false, error: err })
    }

    server
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: server._id,
                message: 'server created',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'server not created',
            })
        })
}

updateServer = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Server.findOne({ _id: req.params.id }, (err, server) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Server not found!',
            })
        }
        //console.log(server)
        server.hostname = body.hostname
        server.os = body.os
        server.used = body.used
        server.user = body.user
        //console.log(server)
        server
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: server._id,
                    message: 'Server updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Server not updated!',
                })
            })
    })
}

deleteServer = async(req,res) => {
    await Server.findOneAndDelete({ _id: req.params.id}, (err, server) => {
        if (err) {
            return res.status(400).json({ success: false, error: err})
        }

        if (!server) {
            return res.status(404).json({ success: false, error: `server not found`})
        }
        return res.status(200).json({ success: true, data: server })
    })
    .catch(err => console.log(err))
    
}

getServerById = async (req, res) => { 
    await Server.findOne({ _id: req.params.id }, (err,server) => {
        if (err) {
            return res.status(400).json({ success: false, error: err})
        }
        if (!server) {
            return res.status(400).json({ success: false, error: `server not found` })
        }
        return res.status(200).json({ success: true, data: server })
    })
    .catch(err => console.log(err))
}

getServers = async (req, res) => {
    await Server.find({}, (err, servers) => {
        if (err) {
            return res.status(400).json({ sucess: false, error: err })
        }
        if (!servers.length) {
            return res.status(400).json({ success: false, error: `server not found` })
        }
        return res.status(200).json({ success: true, data: servers })
    })
    .catch(err => console.log(err))
}

module.exports = {
    createServer,
    updateServer,
    deleteServer,
    getServers,
    getServerById
}