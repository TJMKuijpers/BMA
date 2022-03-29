
// Dependencies to launch the server
var MongoClient = require('mongodb').MongoClient;
var express = require('express');
const path = require('path');
const url = 'mongodb://127.0.0.1:27017';
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
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

	// Add routing to the server
	app.get('/', (request,response)=>{
		response.sendFile(path.join(__dirname, '/index.html'));
	});


	app.get('/', (request,response) =>{
    // Specify database you want to access
    const db = client.db('HeartValveDb');
	const heartvalves = db.collection('heartvalves')
	
	// Find one document in the heartvalve collection
	heartvalves.find().toArray((err, results) => {
		if (err){
			return console.log(err);
		}
		else{
			return console.log(results)
		}
	})
});	
}
)
