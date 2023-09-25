const upload = async(req,res) => {
    try{
        console.log('POST request received to /image-upload.');
        console.log('Axios POST body: ', req.body);
        console.log("POST request recieved on server to /image-upload.")
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