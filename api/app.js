var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mysql      = require('mysql');
var md5      = require('md5');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

// app.post('/process_post', urlencodedParser, function (req, res) {
//    // Prepare output in JSON format
//    response = {
//       first_name:req.body.first_name,
//       last_name:req.body.last_name
//    };
//    console.log(response);
//    res.end(JSON.stringify(response));
// })
app.get('/fetch', function (req, res) {
	var connection = mysql.createConnection({
	  	host     : 'localhost',
	  	user     : 'root',
	  	password : 'root',
	  	database : 'vc_ignition'
	});

	connection.connect();

	connection.query('SELECT * from accounts;', function(err, rows, fields) {
	  	if (err) throw err;

	  	res.end(JSON.stringify(rows));
	});

	connection.end();
})

app.get('/auth/:username/:password', urlencodedParser, function (req, res) {
	var connection = mysql.createConnection({
	  	host     : 'localhost',
	  	user     : 'root',
	  	password : 'root',
	  	database : 'vc_ignition'
	});

	connection.connect();

	var query = 'SELECT \
					* \
				from accounts \
				where username = ? and password = ?;';

	connection.query(query, [req.params.username, md5(req.params.password)], function(err, rows, fields) {
	  	if (err) throw err;
	  	res.end(JSON.stringify(rows[0]));
	});

	connection.end();
})

var server = app.listen(8080, function () {
   	var host = server.address().address
   	var port = server.address().port
   
   	console.log("Ignition API is listening at http://%s:%s", host, port)
})