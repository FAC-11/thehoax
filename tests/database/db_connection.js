 const { Pool } = require('pg');
 const url = require('url');
 require('env2')('config.env');

 if (!process.env.DATABASE_URLx) {
   throw new Error('Environment variable DATABASE_URLx must be set!');
 }

 const params = url.parse(process.env.DATABASE_URLx);
 const [user, password] = params.auth.split(':') || ['', ''];
 const options = {
   host: params.hostname,
   port: params.port,
   database: params.pathname.split('/')[1],
   max: process.env.DB_MAX_CONNECTIONS || 2,
   user,
   password
 }

 options.ssl = (options.host !== 'localhost');

 module.exports = new Pool(options);
