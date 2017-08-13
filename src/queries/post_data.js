const dbConnection = require ('../database/db_connection');
const sqlPost = 'INSERT INTO history (userid, searchdate, search) VALUES ($1, $2, $3)';

const postData = (inputObj, cb) => {
    dbConnection.query (sqlPost, [inputObj.userid, inputObj.searchdate, inputObj.search], (err, res) => {
    if (err)
      return cb (err);
    else {
    cb (null, res);
    }
  });

};

module.exports = postData;
