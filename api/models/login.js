
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'vc_ignition'
});

connection.connect();

var result;
connection.query('SELECT username, password from accounts', function(err, rows, fields) {
  if (err) throw err;

  result = rows;
  // for(var i in rows){
  // 	console.log('Username: ', rows[i].username);
  // 	console.log('Username: ', rows[i].password);
  // }
});

connection.end();

module.exports = { result : result };