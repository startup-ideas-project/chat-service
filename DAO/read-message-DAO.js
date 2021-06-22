const {dynamoDBClient} = require('./dynamoDB/dynamodb')
const {MessageTableParams} = require('./create-message-table')

const generateScanParams = (creator) => {
    const params =  {
        TableName: MessageTableParams.TableName,
        FilterExpression: `creator = :creator`,
        ExpressionAttributeValues:{
            ":creator": creator
        }
    }
    return params;
}
const getMessageDAO = ({creator}) => {
    const params = generateScanParams(creator)
    return dynamoDBClient.scan(params).promise()
}

module.exports = {
    getMessageDAO
}