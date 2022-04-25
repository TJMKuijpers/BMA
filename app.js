const express = require('express');
const app = express();
const test = require('assert');
const bodyParser = require('body-parser');
const {MongoClient}  = require("mongodb");
const url = 'mongodb://localhost:27017/';
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
    await client.db("testDB").command({ ping: 1 });
    console.log("Connected successfully to server");
    console.log(client.db("testDB").collection('customers').find({}));
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run();
// export the app so we can use it on our server
module.exports = app;


