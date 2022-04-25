const http = require('http');
const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
// make sure a valid port is always provided (whether it is provided as a number or string)
const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);


// Check for some errors
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};


const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);


/*
// Dependencies to launch the server
var MongoClient = require('mongodb').MongoClient;
var express = require('express');
const path = require('path');
const url = 'mongodb://127.0.0.1:27017';
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const { response } = require('express');

// Server uses static files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        return console.log(err);
    }
	const db = client.db('HeartValveDb');
	
	// Add routing to the server
	app.get('/', (request,response)=>{
		response.sendFile(path.join(__dirname, '/index.html'));
	});
	app.get('/start',(request,reponse)=>{
		// Find all the documents in the database
		var collections_in_db=db.getCollectionNames();
		var count_db=[];
		collections_in_db.forEach(function(collection_name){
			count=db[collection_name].countDocuments();
			count_db.push(count);
		});
		db_information=count_db;
		// create an object to store collection name and count of document
		return response.send(db_information);
		console.log(db_information)
		})
	// get the overview of all documents when loading the page
	
	// Add a get request when data is searched
	app.get('/search', (request,response)=>{
		const collection_to_search =  db.collection('heartvalves');
		collection_to_search.find.toArray((error,results)=>{
			if (error){return console.log(error)}
			else{ response.send(results)}
		})

	})
});	

*/
