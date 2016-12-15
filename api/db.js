var mysql = require('mysql')
  , async = require('async')

var PRODUCTION_DB = 'vc_ignition'
  , TEST_DB = 'ignition'

exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCTION = 'mode_production'

var state = {
  pool: null,
  mode: null,
}

exports.connect = function(mode, done) {
  if (mode === exports.MODE_PRODUCTION) {
    state.pool = mysql.createPoolCluster()

    state.pool.add('WRITE', {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: PRODUCTION_DB
    })

    // state.pool.add('READ1', {
    //   host: '192.168.0.6',
    //   user: 'your_user',
    //   password: 'some_secret',
    //   database: PRODUCTION_DB
    // })

    // state.pool.add('READ2', {
    //   host: '192.168.0.7',
    //   user: 'your_user',
    //   password: 'some_secret',
    //   database: PRODUCTION_DB
    // })
  } else {
    state.pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: PRODUCTION_DB
    })
  }

  state.mode = mode
  done()
}

exports.READ = 'read'
exports.WRITE = 'write'

exports.get = function(type, done) {
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  if (type === exports.WRITE) {
    state.pool.getConnection('WRITE', function (err, connection) {
      if (err) return done(err)
      done(null, connection)
    })
  } else {
    state.pool.getConnection('READ*', function (err, connection) {
      if (err) return done(err)
      done(null, connection)
    })
  }
}

exports.fixtures = function(data) {
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  var names = Object.keys(data.tables)
  async.each(names, function(name, cb) {
    async.each(data.tables[name], function(row, cb) {
      var keys = Object.keys(row)
        , values = keys.map(function(key) { return "'" + row[key] + "'" })

      pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
    }, cb)
  }, done)
}

exports.drop = function(tables, done) {
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  async.each(tables, function(name, cb) {
    pool.query('DELETE * FROM ' + name, cb)
  }, done)
}