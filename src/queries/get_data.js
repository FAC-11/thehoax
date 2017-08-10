const db_connection = require('../database/db_connection.js');
const temporaryConst = 'SELECT users.username, history.search, history.searchdate FROM history INNER JOIN users ON users.id = history.userid;'

const getData = (cb) => {
  dbConnection.query(temporaryConst, (err, res) => {
    if(err){
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = getData;
