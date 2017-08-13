BEGIN;

DROP TABLE IF EXISTS users, history CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  hash VARCHAR(100)
);

INSERT INTO users(username, email, hash) VALUES
 ('secretSquirrel','secretSquirrel@tinfoild.com','$2a$10$911jG3PlVr02HE5VXNi8euzf/qnVOY9eG8fW4P.5qmxzGhU5uq9D6'),
 ('theConspirat0r','theConspirat0r@tinfoild.com', '$2a$10$pGM8hQ0RVHKcd/ZmIVQ/..NvoRMn2GBN8mvAVxa746fyOp5pY1sFy'),
 ('theRealSherlock','theRealSherlock@tinfoild.com','$2a$10$3xolckCwuz.hbOiJF.zp.eG2vI2WnXYnBD6LmodojRZwGp/UW7juS');

 -- S3crEtSconS!
 -- c0nSpiracy123!
 -- Sh3erl0ck1234!

 CREATE TABLE history (
   id SERIAL PRIMARY KEY,
  --  userid int4 REFERENCES users(id),
   userid int4 REFERENCES users(id),
   searchdate timestamp NOT NULL,
   search VARCHAR(100) NOT NULL,
 );

 INSERT INTO history(userid, searchdate, search) VALUES
  ('1','2017-08-09 12:45:34.243', 'Is Bin-Laden alive?'),
  ('2','2017-06-30 13:45:34.243', 'Is Abdullah a spy?'),
  ('3','2017-07-15 01:45:34.243', 'Is the moon landing fake?');


 COMMIT;
