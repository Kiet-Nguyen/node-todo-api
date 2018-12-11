const mongoose = require('mongoose');

// User model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 1
  }
});

const User = mongoose.model('User', userSchema);

// const newUser = new User({
//   email: 'test@email.com'
// });
// newUser.save().then(docs => {
//   console.log(JSON.stringify(docs, undefined, 2));
// }, err => {
//   console.log('Unable to create new user', err);
// });

module.exports = { User };
