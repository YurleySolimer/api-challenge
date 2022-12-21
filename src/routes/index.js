const express = require('express')
const router = express.Router()

const {
    listFiles,
    getFiles
} = require('../services/index')

router.get('/files/list', async(req, res, next) => {
    try {
        const files = await listFiles()
        res.status(200).json(files)
    } catch (error) {
        next(error)       
    }
})

router.get('/files/data', async(req, res, next) => {
    try {
        const { name } = req.query
        const file = await getFiles(name)
        res.status(200).json(file)
    } catch (error) {
        next(error)
    }
})

module.exports = router;