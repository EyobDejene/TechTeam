var mongoose = require( 'mongoose' );

let loginSchema = new mongoose.Schema({
    email: String,
    password: String,
});


const login = mongoose.model('login', loginSchema);



module.exports = login;