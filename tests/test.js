const tape = require("tape");
const buildDataBase = require("../src/database/db_build.js");
const dbConnection = require("../src/database/db_connection.js");


tape("Select all from users", t => {
  buildDataBase();
  const expected = [
    {
      username: 'secretSquirrel',
      email: 'secretSquirrel@tinfoild.com',
      password: 'S3crEtSconS!',
      hash: 'jdfjaebkjehrhehjdfhbe'
    },
    {
      username: 'theConspirat0r',
      email: 'theConspirat0r@tinfoild.com',
      password: 'c0nSpiracy123!',
      hash: 'wdfjbqfuvwahdkwkjhodufye'
    },
    {
      username: 'theRealSherlock',
      email: 'theRealSherlock@tinfoild.com',
      password: 'Sh3erl0ck1234!',
      hash: 'defhjqhbdjhfhedffe'
    }
  ];
  dbConnection.query("SELECT username, email, password, hash FROM users;", (err, res) => {
    if(err){
      t.error(err, 'this is an error')
    } else {
      console.log('actual', res.rows);
      const actual = res.rows;
      t.deepEquals(actual, expected, "db_connection connects to the database and sends the correct data");
      t.end();
    }
  });
});
