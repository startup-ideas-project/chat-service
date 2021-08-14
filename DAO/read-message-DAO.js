const {dynamoDBClient} = require('./dynamoDB/dynamodb')
const {MessageTableParams} = require('./create-message-table')

const generateScanParams = (commentID) => {
    const params =  {
        TableName: MessageTableParams.TableName,
        KeyConditionExpression: `commentID = :commentID and created < :now`,
        ExpressionAttributeValues:{
            ":commentID": commentID,
            ":now": Date.now()
        }
    }
    return params;
}
const getMessageDAO = ({commentID}) => {
    const params = generateScanParams(commentID)
    return dynamoDBClient.query(params).promise()
}

module.exports = {
    getMessageDAO
}