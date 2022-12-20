const express = require('express')
const router = express.Router()

const {
    listFiles,
    getFile
} = require('../controllers/index')

router.get('/', async(req, res) => {
    try {
        const files = await listFiles()
        res.status(200).json(files)
    } catch (error) {
        console.log(error)
    }
})

router.get('/:name', async(req, res) => {
    try {
        const { name } = req.params
        const file = await getFile(name)
        res.status(200).json(file)
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;