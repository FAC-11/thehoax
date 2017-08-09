BEGIN;

DROP TABLE IF EXISTS users, history CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  hash VARCHAR(100) NOT NULL
);

INSERT INTO users(username, email, hash) VALUES
 ('secretSquirrel','secretSquirrel@tinfoild.com','$2a$10$sC.59Y4qqYh9s9za4iuXde8.mbUbEyQlfBR8LgwPj5gpBpLgAklnu'),
 ('theConspirat0r','theConspirat0r@tinfoild.com', '$2a$10$yXQokIuBEBYN7MKl5gy/P.pc1aHea4Ow/8yzim7Q9QiQ60a3w6xA2'),
 ('theRealSherlock','theRealSherlock@tinfoild.com','$2a$10$XKvMVmVljg68aKsPsSeN5.QXVkx0cQhW3RQE49mTTchxm7tRgEHom');

 -- S3crEtSconS!
 -- c0nSpiracy123!
 -- Sh3erl0ck1234!

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
