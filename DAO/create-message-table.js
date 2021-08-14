const {dynamodb} = require('./dynamoDB/dynamodb');


const MessageTableParams = {
    TableName : "Chat_Message",
    KeySchema: [       
        { AttributeName: "commentID", KeyType: "HASH"},  //Partition key
        { AttributeName: "created", KeyType: "RANGE" }, //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "commentID", AttributeType: "S" },
        { AttributeName: "created", AttributeType: "N" }
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

const deleteTable = async  (db, params) => {
    await db.deleteTable(params, (err, data) => {
        if (err){
            console.error("Unable to delete the chat table")
        } else {
            console.log("Successfully delete chat table")
        }
    })
}

const createMessageTable = async () => {
    // await deleteTable(dynamodb, {TableName: MessageTableParams.TableName})
    createTable(dynamodb,MessageTableParams)
}

module.exports = {
    createMessageTable,
    MessageTableParams
}