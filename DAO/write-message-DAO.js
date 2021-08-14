const {dynamoDBClient} = require('./dynamoDB/dynamodb')
const {MessageTableParams} = require('./create-message-table')
const { v4: uuidv4 } = require('uuid');
const moment = require('moment')


// using this method to minimize ability to wildly created whatever field wanted
const generateMessageRecord = ({message, commentID}) => {
    const data =  {
        TableName: MessageTableParams.TableName,
        Item: {
            messageID: uuidv4(),
            created: Date.now(), //convert into miliseconds
            creator: message.sender,
            message: message.message,
            commentID
        }
    }
    return data;
}

const createRecord = (message, commentID) => {
    const params = generateMessageRecord({
        message,
        commentID
    })
    console.log(params)
    dynamoDBClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

module.exports = {
    createRecord
}