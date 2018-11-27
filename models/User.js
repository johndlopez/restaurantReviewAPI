const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'You must include an email.'
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true
  }
});

mongoose.exports = mongoose.model('User', userSchema);
