// sent to from handlers
// require db connection
// (user, password, cb()=>{})
// needs verify user function which will take password and user name
// salt n hash
// compare to database

// cb(err, res)
// Create error first call back
// if error then make error() and send back to homepage
// if user exists then we will make JWT and redirect to /tinfoild
