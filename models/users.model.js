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
    skill_level: Number,
    running_scheme: Number,
    practice_time: Number,
    max_distance: Number,
    match_date: { type: Date, default: Date.now },
});


const User = mongoose.model('Users', UsersSchema);



module.exports = User;