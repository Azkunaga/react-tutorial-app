const mongodbConnection = require('../config/mongodb');

const topicService = require('../services/topicService');

const topicExists =  async (req, res, next) => {
    const topic = await topicService.getTopic(req.body.topic);
    if(topic){
        return res.status(409).send({ message: "Topic already exists" });
    }
    next();
}

module.exports = {
    topicExists,
}
