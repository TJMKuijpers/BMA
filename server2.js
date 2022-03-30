
// Dependencies to launch the server
var MongoClient = require('mongodb').MongoClient;
var express = require('express');
const path = require('path');
const url = 'mongodb://127.0.0.1:27017';
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const { response } = require('express');
// Configure Routing and port
const port = 8080;// Listen to port
app.listen(port);
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


