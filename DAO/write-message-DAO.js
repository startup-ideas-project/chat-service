const {dynamoDBClient} = require('./dynamoDB/dynamodb')
const {MessageTableParams} = require('./create-message-table')
const { v4: uuidv4 } = require('uuid');
const moment = require('moment')


// using this method to minimize ability to wildly created whatever field wanted
const generateMessageRecord = ({creator,message}) => {
    const data =  {
        TableName: MessageTableParams.TableName,
        Item: {
            messageID: uuidv4(),
            created: moment().format(),
            creator,
            message
        }
    }
    return data;
}

const createRecord = (creator, message) => {
    const params = generateMessageRecord({
        creator,
        message
    })
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