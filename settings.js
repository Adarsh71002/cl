// settings.js
var settings = {
  development: {
    // DSN: postgres://USER:PASSWORD@HOST:PORT/DBNAME
    dsn: "postgres://notejam:notejam@db:5432/notejam"
  },
  test: {
    dsn: "postgres://notejam:notejam@db:5432/notejam_test"
  }
};

var env = process.env.NODE_ENV || 'development';
module.exports = settings[env];
