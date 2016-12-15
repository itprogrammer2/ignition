var db = require('../db.js')

exports.create = function(username, password, done) {
  //var values = [username, text, new Date().toISOString()]
  var values = [username, password]
  
  db.get(db.WRITE, function(err, connection){
    if(err) return done('Database problem');
    connection.query('INSERT INTO accounts (username, password) VALUES(?, ?)', values, function(err, result) {
      if (err) return done(err)
      done(null, result.username)
    })
  })
}

exports.fetch = function(done) {
  db.get(db.READ, function(err, connection){
    connection.query('SELECT * FROM accounts', function (err, rows) {
      if (err) return done(err)
      done(null, rows)
    })
  })
}

exports.auth = function(username, password, done) {
  var values = [username, password]
  
  db.get(db.READ, function(err, connection){
    connection.query('SELECT * FROM accounts WHERE username = ? and ?;', values, function(err, result) {
      if (err) return done(err)
      done(null, result.username)
    })
  })
}