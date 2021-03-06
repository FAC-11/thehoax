const tape = require("tape");
const shot = require('shot');
const fs = require('fs');
const path = require('path');
const buildDataBase = require("./database//db_build.js");
const dbConnection = require("./database/db_connection.js");
const router = require('../src/router.js');
const handlers = require('../src/handlers.js');


tape("Select all from users", t => {
  buildDataBase();
  const expected = [{
      username: 'secretSquirrel',
      email: 'secretSquirrel@tinfoild.com',
      hash: '$2a$10$911jG3PlVr02HE5VXNi8euzf/qnVOY9eG8fW4P.5qmxzGhU5uq9D6'
    },
    {
      username: 'theConspirat0r',
      email: 'theConspirat0r@tinfoild.com',
      hash: '$2a$10$pGM8hQ0RVHKcd/ZmIVQ/..NvoRMn2GBN8mvAVxa746fyOp5pY1sFy'
    },
    {
      username: 'theRealSherlock',
      email: 'theRealSherlock@tinfoild.com',
      hash: '$2a$10$3xolckCwuz.hbOiJF.zp.eG2vI2WnXYnBD6LmodojRZwGp/UW7juS'
    }
  ];
  dbConnection.query("SELECT username, email, hash FROM users;", (err, res) => {
    if (err) {
      t.error(err, 'this is an error')
    } else {
      const actual = res.rows;
      t.deepEquals(actual, expected, "db_connection connects to the database and sends the correct data");
      t.end();
    }
  });
});

tape("Select all from history", t => {
  buildDataBase();
  const expected = [{
      userid: 1,
      // searchdate: new Date('at Wed Aug 09 2017 12:45:34 GMT+0100 (BST)'),
      search: 'Is Bin-Laden alive?'
    },
    {
      userid: 2,
      // searchdate: new Date('at Fri Jun 30 2017 13:45:34 GMT+0100 (BST)'),
      search: 'Is Abdullah a spy?'
    },
    {
      userid: 3,
      // searchdate: new Date('at Sat Jul 15 2017 01:45:34 GMT+0100 (BST)'),
      search: 'Is the moon landing fake?'
    }
  ];
  console.log(expected[0].searchdate);
  dbConnection.query("SELECT userid, search FROM history;", (err, res) => {
    if (err) {
      t.error(err, 'this is an error')
    } else {
      const actual = (res.rows);
      t.deepEquals(actual, expected, "db_connection connects to the database history and sends the correct data");
      t.end();
    }
  });
});


//inserting data

tape("Insert name and location into users table", t => {
  buildDataBase();
  const insertNameEmail =
    "INSERT INTO users (username, email) VALUES ($1, $2)";
  const expected = [{
    username: 'theInfiltrator',
    email: 'donotspyme@tinfoild.com'
  }];
  dbConnection.query(
    insertNameEmail, [expected[0].username, expected[0].email],
    (err, res) => {
      if (err) {
        t.error(err, 'this is an historyError')
      } else {
        dbConnection.query(
          "SELECT username, email FROM users WHERE username = 'theInfiltrator';",
          (err, res) => {
            if (err) {
              t.error(err, 'this is an error')
            } else {
              console.log(res.rows);
              const actual = res.rows;
              t.deepEquals(actual, expected, "the database should contain the new input");
              t.end();
            }
          })
      }
    })
});

//now we test the router, handlers..

tape('home route', (t) => {
  shot.inject(router, {
    method: 'get',
    url: '/'
  }, (res) => {
    t.equal(res.statusCode, 200, 'Should respond with a status code of 200');
    t.ok(res.payload.includes("<h1>Tinfoil'd</h1>"),
      "The main header should be <h1>Tinfoil'd</h1>")
    t.end();
  })
})



tape.onFinish(() => process.exit())
