const {dynamodb} = require('./dynamoDB/dynamodb');


const MessageTableParams = {
    TableName : "Chat_Message",
    KeySchema: [       
        { AttributeName: "messageID", KeyType: "HASH"},  //Partition key
        { AttributeName: "commentID", KeyType: "RANGE" }, //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "messageID", AttributeType: "S" },
        { AttributeName: "commentID", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

const createTable = (db, params) =>{
    db.createTable(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
}

const createMessageTable = () => {
    createTable(dynamodb,MessageTableParams)
}

module.exports = {
    createMessageTable,
    MessageTableParams
}