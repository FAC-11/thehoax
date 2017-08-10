const bcrypt = require('bcryptjs');
const db = require('./database/db_connection');

const loginQuery = (username, password, callback, callback2) => {
  let verifyUserRes = false;

  const sqlQuery = `SELECT * FROM users WHERE username='${username}'`;
  db.query(sqlQuery, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      console.log("res.rows: " + res.rows);
      const responseObj = {
        username: res.rows[0].username,
        email: res.rows[0].email,
        hash: res.rows[0].hash,
      };
      callback(null, password, res.rows[0].hash, callback2);
      // console.log("verifyUserRes: " + verifyUserRes);

    }
  });
  // return verifyUserRes;
};

const verifyUser = (err, password, hashedPassword, callback2) => {
  if (err) {
    console.log('error: ' + err);
  } else {

    bcrypt.compare(password, hashedPassword, (err, res) => {
      if (err) {
        callback2(err);
      } else {
        console.log("response: " , res);
        callback2(null, res);
      }
    });
  }

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

const returnBoolean = (err, res) => {
  if (err) console.log(err)
  else {
    return res;
  }
}

module.exports = {
  loginQuery,
  verifyUser,
  returnBoolean
};

// hashPassword('Sh3erl0ck1234!');
// loginQuery('secretSquirrel', 'S3scrEtSconS!', verifyUser);
// loginQuery('theConspirat0r', 'c0nSpiracy123!', verifyUser);
// loginQuery('theRealSherlock', 'Shv3erl0ck1234!', verifyUser);
