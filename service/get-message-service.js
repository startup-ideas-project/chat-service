const {getMessageDAO} = require('../DAO/read-message-DAO');

const getMessage = async (req, res) => {
    const commentID = req.params.commentID
    getMessageDAO({commentID}).then(data => res.send(JSON.stringify(data)))
}

module.exports = {
    getMessage
}