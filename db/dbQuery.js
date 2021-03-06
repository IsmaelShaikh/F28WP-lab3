const mysql = require("mysql");
const databasename = "sales";

var pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "",
  database: "sales",
  debug: true,
});

// Execute passed query
function executeQuery(query, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      return callback(err, null);
    } else if (connection) {
      connection.query(query, function (err, rows, fields) {
        connection.release();
        if (err) {
          return callback(err, null);
        }
        return callback(null, rows);
      });
    } else {
      return callback(true, "No Connection");
    }
  });
}

// Get result from query
function getResult(query, callback) {
  executeQuery(query, function (err, rows) {
    if (!err) {
      callback(null, rows);
    } else {
      callback(true, err);
    }
  });
}

module.exports = {
  getResult,
};
