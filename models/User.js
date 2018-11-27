const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid email address'],
    required: 'You must include a email.'
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true,
    unique: true
  }
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

mongoose.exports = mongoose.model('User', userSchema);
