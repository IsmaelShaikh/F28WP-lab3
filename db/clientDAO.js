const database = require("./dbQuery");
const bcrypt = require("bcryptjs");

// Return list of all clients
function find(callback) {
  const selectClients = `SELECT * from client;`;
  database.getResult(selectClients, function (err, rows) {
    if (!err) {
      callback(null, rows);
    } else {
      console.log(err);
      throw err;
    }
  });
}

// Find user by username
function findByUsername(username, callback) {
  const selectClient = `SELECT * from account where username like '${username}';`;
  database.getResult(selectClient, function (err, rows) {
    if (!err) {
      callback(null, rows);
    } else {
      console.log(err);
    }
  });
}

// Find user by society
function findBySociety(society, callback) {
  const selectSociety = `SELECT * from account where society like '${society}';`;
  database.getResult(selectSociety, function (err, rows) {
    if (!err) {
      callback(null, rows);
    } else {
      console.log(err);
    }
  });
}

// Find user by unique ID
function findByNumclient(num_client, callback) {
  const selectNumClient = `SELECT * from account where num_client like '${num_client}';`;
  database.getResult(selectNumClient, function (err, rows) {
    if (!err) {
      callback(null, rows);
    } else {
      console.log(err);
    }
  });
}

// Encrypt password using bcrypt
function cryptPassword(pass, callback) {
  // Set the complexity of the salt generation
  const saltRounds = 10;
  // Generate random salt (to be added to the password to generate random hash)
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      throw err;
    } else {
      // Hash the password using the generated salt
      bcrypt.hash(pass, salt, function (err, hash) {
        if (err) {
          throw err;
        } else {
          // console.log(`hash -> ${hash}`);
          // Return the computed hash
          callback(err, hash);
        }
      });
    }
  });
}

// Create new user account in database
function createAccount(num_client, username, password, callback) {
  cryptPassword(password, function (err, hash) {
    console.log(`Hash(${password}) -> ${hash}`);
    const insertAccount = `INSERT INTO account(num_client, username, password) VALUES(${num_client}, '${username}', '${hash}');`;
    database.getResult(insertAccount, function (err2, result2) {
      if (!err2) {
        callback(null, result2.affectedRows, num_client);
      } else {
        console.log(err2);
        throw err2;
      }
    });
  });
}

// Create client with client details in database
function createClient(client, callback) {
  // Insert client
  const insertClient = `INSERT INTO client(society, contact, addres, zipcode, city, phone, fax, max_outstanding) VALUES('${client.society}', '${client.contact}', '${client.addres}', '${client.zipcode}', '${client.city}', '${client.phone}', '${client.fax}', ${client.max_outstanding});`;
  database.getResult(insertClient, function (err1, result1) {
    if (!err1) {
      // If no error, insert account details
      createAccount(
        result1.insertId,
        client.username,
        client.password,
        callback
      );
    } else {
      console.log(err1);
      throw err1;
    }
  });
}

module.exports = {
  find,
  findByUsername,
  findBySociety,
  findByNumclient,
  createClient,
  // deleteClient,
  // createInitialAccounts
};
