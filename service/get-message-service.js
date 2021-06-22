const {getMessageDAO} = require('../DAO/read-message-DAO');

const getMessage = async (req, res) => {
    const body = req.body
    console.log(body)
    // find userID in the body and send it to the query
    // const creator = ....

    getMessageDAO({creator: 'authenticatedUser1'}).then(data => res.send(JSON.stringify(data)))
}

module.exports = {
    getMessage
}