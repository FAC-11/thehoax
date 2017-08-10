const bcrypt = require('bcryptjs');
const db = require('./database/db_connection');

const loginQuery = (username, password, callback) => {
  const sqlQuery = `SELECT * FROM users WHERE username='${username}'`;
  db.query(sqlQuery, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      const responseObj = {
        username: res.rows[0].username,
        email: res.rows[0].email,
        hash: res.rows[0].hash,
      };
      callback(null, password, res.rows[0].hash);
    }
  });
};

const verifyUser = (err, password, hashedPassword) => {
  bcrypt.compare(password, hashedPassword, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Response: ${res}`);
    }
  });
};

const hashPassword = (password) => {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      if (err) {
        console.error('Error');
      } else {
        console.log(`Password: ${password}, Hash: ${hash}`);
      }
    });
  });
};

// hashPassword('Sh3erl0ck1234!');
// loginQuery('secretSquirrel', 'S3scrEtSconS!', verifyUser);
// loginQuery('theConspirat0r', 'c0nSpiracy123!', verifyUser);
// loginQuery('theRealSherlock', 'Shv3erl0ck1234!', verifyUser);
