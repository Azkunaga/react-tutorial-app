const upload = async(req,res) => {
    try{
        res.status(200).send({
            message: "Uploaded!!",
            image: req.file.filename,
          })
    }catch (error) {
        res.status(500).send({
            error: error.mesage, 
        })
    }
}

module.exports = {
    upload,
}