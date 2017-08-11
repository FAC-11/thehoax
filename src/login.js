const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('env2')('./config.env');
const db = require('./database/db_connection');

//1: loginQuery
const loginQuery = (obj, callback) => {

  const sqlQuery = `SELECT * FROM users WHERE username='${obj.username}'`;
  db.query(sqlQuery, (err, res) => {
    if (err) {
      return callback(err, null);
    } else {
      obj.hashedPassword = res.rows[0].hash;
      return callback(null, obj);
    };
  });
};

// 2: verifyUser
const verifyUser = (obj, callback) => {
  bcrypt.compare(obj.password, obj.hashedPassword, (err, res) => {
    if (err) {
      return callback(err);
    } else {
      if (res) {
        obj.loggedIn = true;
        obj.password = '';
      } else {
        obj.loggedIn = false;
        obj.password = '';
      }
      return callback(null, obj);
    }
  });
};

//3: make a JWT

const makeJwt = (obj, callback) => {
  if (obj.loggedIn === false) {
    return callback('Not Authorised!');
  } else {
    obj.jwebtoken = jwt.sign(obj, process.env.SECRET);
    console.log(obj.jwebtoken);
    return callback(null, obj);
  }
};

module.exports = {
  loginQuery,
  verifyUser,
  makeJwt
};

// hashPassword('Sh3erl0ck1234!');
// loginQuery('secretSquirrel', 'S3scrEtSconS!', verifyUser);
// loginQuery('theConspirat0r', 'c0nSpiracy123!', verifyUser);
// loginQuery('theRealSherlock', 'Shv3erl0ck1234!', verifyUser);
