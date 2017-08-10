// sent to from handlers
// require db connection
// (user, password, cb()=>{})
// needs verify user function which will take password and user name
// salt n hash
// compare to database
const bcrypt = require('bcryptjs');
const db = require('./database/db_connection');

const hashPassword = (password, callback1, callback2) => {
  bcrypt.genSalt(12, (err, salt) => {
    if (err) {
      callback1(err);
    } else {
      bcrypt.hash(password, salt, (error, hash) => {
        if (err) {
          callback1(error, null, callback2);
        } else {
          callback1(null, hash, callback2);
        }
      });
    }
  });
};

const verifyUser = (err, hash, callback2) => {
  if (err) {
      callback2(err);
  } else {
    let sqlQuery = `SELECT * FROM users`;
    //  WHERE password=${hash}
    db.query(sqlQuery, (err, res) => {
      if (err) {
        callback2(err, null);
      } else {
        const responseObj = {
          username: res.rows[0].username,
          email: res.rows[0].email,
          password: res.rows[0].password,
        }

        callback2(null, responseObj);
      }
    });
  }
};

const doSomething = (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
  }
};

const hashPasswordSync = (password) => {
  bcrypt.genSalt(12, (err, salt) => {
    if (err) {
      console.log(err);
    } else {
      bcrypt.hash(password, salt, (error, hash) => {
        if (err) {
          console.log(error);
        } else {
          console.log(hash + ' ' + password);
        }
      });
    }
  });
};

// hashPasswordSync('S3crEtSconS!');
// hashPasswordSync('c0nSpiracy123!');
// hashPasswordSync('Sh3erl0ck1234!');

hashPassword('wtf', verifyUser, doSomething);
// cb(err, res)
// Create error first call back
// if error then make error() and send back to homepage
// if user exists then we will make JWT and redirect to /tinfoild
