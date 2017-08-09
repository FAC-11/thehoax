BEGIN;

DROP TABLE IF EXISTS users, history CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  hash VARCHAR(100) NOT NULL
);

INSERT INTO users(username, email, password, hash) VALUES
 ('secretSquirrel','secretSquirrel@tinfoild.com', 'S3crEtSconS!','jdfjaebkjehrhehjdfhbe'),
 ('theConspirat0r','theConspirat0r@tinfoild.com', 'c0nSpiracy123!','wdfjbqfuvwahdkwkjhodufye'),
 ('theRealSherlock','theRealSherlock@tinfoild.com', 'Sh3erl0ck1234!','defhjqhbdjhfhedffe');

 CREATE TABLE history (
   id SERIAL PRIMARY KEY,
   userId int4 REFERENCES users(id),
   searchDate timestamp NOT NULL,
   search VARCHAR(100) NOT NULL
 );

 INSERT INTO history(userId, searchDate, search) VALUES
  ('1','2017-08-09 12:45:34.243', 'Is Bin-Laden alive?'),
  ('2','2017-06-30 13:45:34.243', 'Is Abdullah a spy?'),
  ('3','2017-07-15 01:45:34.243', 'Is the moon landing fake?');


 COMMIT;
