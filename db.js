// db.js
var { Pool } = require('pg');
var async = require('async');
var settings = require('./settings');

// Create a connection pool using the DSN from settings.js
var pool = new Pool({
  connectionString: settings.dsn
});

var functions = {
  createTables: function(next) {
    async.series(
      {
        createUsers: function(callback) {
          pool.query(
            "CREATE TABLE IF NOT EXISTS users (" +
              "id SERIAL PRIMARY KEY," +
              "email VARCHAR(75) NOT NULL," +
              "password VARCHAR(128) NOT NULL" +
            ");",
            [],
            function(err, result) {
              callback(null);
            }
          );
        },
        createPads: function(callback) {
          pool.query(
            "CREATE TABLE IF NOT EXISTS pads (" +
              "id SERIAL PRIMARY KEY," +
              "name VARCHAR(100) NOT NULL," +
              "user_id INTEGER NOT NULL REFERENCES users(id)" +
            ");",
            [],
            function(err, result) {
              callback(null);
            }
          );
        },
        createNotes: function(callback) {
          pool.query(
            "CREATE TABLE IF NOT EXISTS notes (" +
              "id SERIAL PRIMARY KEY," +
              "pad_id INTEGER REFERENCES pads(id)," +
              "user_id INTEGER NOT NULL REFERENCES users(id)," +
              "name VARCHAR(100) NOT NULL," +
              "text TEXT NOT NULL," +
              "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
              "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
            ");",
            [],
            function(err, result) {
              callback(null);
            }
          );
        }
      },
      function(err, results) {
        next();
      }
    );
  },

  applyFixtures: function(next) {
    var self = this;
    self.truncateTables(function() {
      async.series(
        [
          function(callback) {
            pool.query(
              "INSERT INTO users (id, email, password) VALUES (1, 'user1@example.com', " +
              "'$2a$10$mhkqpUvPPs.zoRSTiGAEKODOJMljkOY96zludIIw.Pop1UvQCTx8u');",
              [],
              function(err, result) {
                callback(null);
              }
            );
          },
          function(callback) {
            pool.query(
              "INSERT INTO users (id, email, password) VALUES (2, 'user2@example.com', " +
              "'$2a$10$mhkqpUvPPs.zoRSTiGAEKODOJMljkOY96zludIIw.Pop1UvQCTx8u');",
              [],
              function(err, result) {
                callback(null);
              }
            );
          },
          function(callback) {
            pool.query(
              "INSERT INTO pads (id, name, user_id) VALUES (1, 'Pad 1', 1);",
              [],
              function(err, result) {
                callback(null);
              }
            );
          },
          function(callback) {
            pool.query(
              "INSERT INTO pads (id, name, user_id) VALUES (2, 'Pad 2', 1);",
              [],
              function(err, result) {
                callback(null);
              }
            );
          },
          function(callback) {
            pool.query(
              "INSERT INTO notes (id, pad_id, user_id, name, text, created_at, updated_at) " +
              "VALUES (1, 1, 1, 'Note 1', 'Text', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);",
              [],
              function(err, result) {
                callback(null);
              }
            );
          },
          function(callback) {
            pool.query(
              "INSERT INTO notes (id, pad_id, user_id, name, text, created_at, updated_at) " +
              "VALUES (2, 1, 1, 'Note 2', 'Text', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);",
              [],
              function(err, result) {
                callback(null);
              }
            );
          }
        ],
        function(err, results) {
          next();
        }
      );
    });
  },

  truncateTables: function(next) {
    async.series(
      [
        function(callback) {
          pool.query("DELETE FROM users;", [], function(err, result) {
            callback(null);
          });
        },
        function(callback) {
          pool.query("DELETE FROM notes;", [], function(err, result) {
            callback(null);
          });
        },
        function(callback) {
          pool.query("DELETE FROM pads;", [], function(err, result) {
            callback(null);
          });
        }
      ],
      function(err, results) {
        next();
      }
    );
  }
};

if (require.main === module) {
  functions.createTables(function() {
    console.log("DB successfully initialized");
  });
}

module.exports = functions;
