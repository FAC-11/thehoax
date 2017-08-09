const fs = require('fs');

const buildDataBase = () => {
  const connection = require('./db_connection');
  const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

  connection.query(sql, (err, result) => {
    if (err) {
      // make more meaningful later - let the user know what's going on
      console.log(err, 'error');
    } else {
      console.log("database created");
    }
  });
};

buildDataBase();
module.exports = buildDatabase;
