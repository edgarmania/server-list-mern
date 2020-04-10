const express = require('express')
const ServerCtrl = require('../controllers/server-ctrl')
const router = express.Router()

router.post('/server-list', ServerCtrl.createServer)
router.put('/server-list/:id', ServerCtrl.updateServer)
router.delete('/server-list/:id', ServerCtrl.deleteServer)
router.get('/server-list/:id', ServerCtrl.getServerById)
router.get('/server-list', ServerCtrl.getServers)

module.exports = router
