var mongoose = require( 'mongoose' );

let loginSchema = new mongoose.Schema({
    email: String,
    password: String,
});


const login = mongoose.model('logins', loginSchema);



module.exports = login;