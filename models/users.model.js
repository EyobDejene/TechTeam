var mongoose = require( 'mongoose' );

let UsersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    age: Number,
    avatar: String,
    bio: String,
    location: Number,
    skill_level: String,
    running_scheme: String,
    practice_time: String,
    match_date: { type: Date, default: Date.now },
});


const User = mongoose.model('Users', UsersSchema);



module.exports = User;