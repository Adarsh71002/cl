var settings = {
  development: {
    dsn: "postgres://notejam:notejam@notejam-postgres:5432/notejam"
  },
  test: {
    dsn: "postgres://notejam:notejam@notejam-postgres:5432/notejam_test"
  }
};

var env = process.env.NODE_ENV || "development";
module.exports = settings[env];
