const tape = require("tape");
const buildDataBase = require("../src/database/db_build.js");
const dbConnection = require("../src/database/db_connection.js");


tape("Select all from users", t => {
  buildDataBase();
  const expected = [
    {
      username: 'secretSquirrel',
      email: 'secretSquirrel@tinfoild.com',
      hash: '$2a$10$sC.59Y4qqYh9s9za4iuXde8.mbUbEyQlfBR8LgwPj5gpBpLgAklnu'
    },
    {
      username: 'theConspirat0r',
      email: 'theConspirat0r@tinfoild.com',
      hash: '$2a$10$yXQokIuBEBYN7MKl5gy/P.pc1aHea4Ow/8yzim7Q9QiQ60a3w6xA2'
    },
    {
      username: 'theRealSherlock',
      email: 'theRealSherlock@tinfoild.com',
      hash: '$2a$10$XKvMVmVljg68aKsPsSeN5.QXVkx0cQhW3RQE49mTTchxm7tRgEHom'
    }
  ];
  dbConnection.query("SELECT username, email, hash FROM users;", (err, res) => {
    if(err){
      t.error(err, 'this is an error')
    } else {
      const actual = res.rows;
      t.deepEquals(actual, expected, "db_connection connects to the database and sends the correct data");
      t.end();
    }
  });
});

tape.onFinish(() => process.exit())
