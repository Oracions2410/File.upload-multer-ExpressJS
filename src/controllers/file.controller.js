const fs = require('fs')
const fileUpload = require('../middlewares/upload')

const upload = async (req, res) => {
    try {

        await fileUpload(req, res)

        console.log('-------------', req.file, '----------------')
        if (req.file === undefined) {
            return res.status(400).send({
                message: `Bad request, please upload valid file`
            })
        }

        res.status(200).send({
            message: `Uploaded the file succefully: ${req.file.originalname}`
        })

    } catch (err) {
        res.status(500).send({ message: `Could not upload file. ${err}` })
    }
}



const getListFiles = (req, res) => {

    const directoryPath = __basedir + '/resources/static/assets/uploads'

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).json({ message: `Unable to scan files` })
        }

        let filesInfos = []

        files.forEach(filename => {
            filesInfos.push({
                name: filename,
                url: 'http://localhost:8080/files/' + filename
            })
        })

        res.status(200).json({ files: filesInfos })
    })

}



const download = (req, res) => {
    const filename = req.params.name
    const directoryPath = __basedir + '/resources/static/assets/uploads/'

    res.download(directoryPath + filename, filename, (err) => {
        if (err) {
            res.status(500).json({ message: `Could not download the file. ${err}` })
        }
    })
}



module.exports = {
    upload,
    getListFiles,
    download
}