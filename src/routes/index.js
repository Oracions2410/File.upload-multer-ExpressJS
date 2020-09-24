const express = require('express')
const router = express.Router()
const fileController = require('../controllers/file.controller')

const routes = (app) => {
    router.post('/upload', fileController.upload)
    router.get('/files', fileController.getListFiles)
    router.get('/files/:name', fileController.download)

    app.use(router)
}

module.exports = routes
