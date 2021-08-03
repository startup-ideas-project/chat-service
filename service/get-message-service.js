const {getMessageDAO} = require('../DAO/read-message-DAO');

const getMessage = async (req, res) => {
    const body = req.body
    console.log(req)
    getMessageDAO({creator: 'authenticatedUser1'}).then(data => res.send(JSON.stringify(data)))
}

module.exports = {
    getMessage
}