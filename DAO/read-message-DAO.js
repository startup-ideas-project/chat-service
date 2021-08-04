const {dynamoDBClient} = require('./dynamoDB/dynamodb')
const {MessageTableParams} = require('./create-message-table')

const generateScanParams = (commentID) => {
    const params =  {
        TableName: MessageTableParams.TableName,
        FilterExpression: `commentID = :commentID`,
        ExpressionAttributeValues:{
            ":commentID": commentID
        }
    }
    return params;
}
const getMessageDAO = ({commentID}) => {
    const params = generateScanParams(commentID)
    return dynamoDBClient.scan(params).promise()
}

module.exports = {
    getMessageDAO
}