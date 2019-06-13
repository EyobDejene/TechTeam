var mongoose = require( 'mongoose' );

let registrationSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    age: Number,
    bio: String,
    skill_level: String,
    running_scheme: String,
    practice_time: String,
    max_distance: Number,
});


const registration = mongoose.model('registration', registrationSchema);



module.exports = registration;