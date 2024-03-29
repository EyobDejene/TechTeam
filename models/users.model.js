var mongoose = require( 'mongoose' );
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

let UsersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    age: Number,
    avatar: {type: String, default: 'profilePlaceholder.png'},
    bio: String,
    location: Number,
    skill_level: Number,
    running_scheme: Number,
    practice_time: Number,
    max_distance: Number,
    match_date: { type: Date, default: Date.now },
});

//Credits: Mokerstier & http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt

UsersSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

UsersSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};


const User = mongoose.model('Users', UsersSchema);



module.exports = User;