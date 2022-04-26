const express = require('express');
const app = express();
var assert = require('assert');
const bodyParser = require('body-parser');
const {MongoClient}  = require("mongodb");
const url = 'mongodb://localhost:27017/';
const databaseName = 'testDB'
// Server uses static files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

// load the index.html file	
app.get('/', (request,response)=>{
		response.sendFile(path.join(__dirname, '/index.html'));
	});


// Connect to the MongoDB server
const client = new MongoClient(url);
// Function to connect to the server
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db(databaseName).command({ ping: 1 });
    console.log("Connected successfully to server");
    client.db(databaseName).collection('topochipscreen').find({}).toArray(function(err,doc){
      assert.equal(err,null);
      return doc;
    })
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
app.get('/atlas',(request,response,next)=>{
    // get the data from the database
    var data=run()
    var data_json=data.toJSON();
    console.log(data_json)
    next();
})

// export the app so we can use it on our server
module.exports = app;


