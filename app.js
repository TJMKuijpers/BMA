const express = require('express');
const app = express();
var assert = require('assert');
const bodyParser = require('body-parser');
const {MongoClient} = require("mongodb");
const { data } = require('jquery');
const url = 'mongodb://localhost:27017/';
const databaseName = 'testDB'
var assert = require('assert');
const { response } = require('express');
// Server uses static files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));


// load the index.html file	
app.get('/', (request,response)=>{
		response.sendFile(path.join(__dirname, '/index.html'));
  });

app.get('/get-data',function(request,response,next){
  var resultArray = [];
  MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if (error) {
      return console.log("Connection failed for some reason");
    }
    // if no error exists we can ask for the data
    var cursor = client.db(databaseName).collection('topochipscreen').find({}).toArray().then(
    function(obj){
      // send the object to the frontend

      // close the database connection
      client.close()
      });   
  
  }) // ends the MongoClient statement    
}); // ends the app.get statement


/*
// Connect to the MongoDB server
const client = new MongoClient(url);
// Function to connect to the server
async function run() {
  
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db(databaseName).command({ ping: 1 });
    var db = client.db(databaseName);
    var cursor = db.collection('topochipscreen').find({});
  } catch(error){
    console.log('There was an error')
  }
  return cursor
}

*/
// export the app so we can use it on our server
module.exports = app;


