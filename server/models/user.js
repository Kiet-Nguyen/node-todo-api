const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// User model
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    }, token: {
      type: String,
      required: true
    }
  }]
});

// Choose what to send back when a mongoose model is converted into a JSON value
UserSchema.methods.toJSON = function() {
  const user = this;
  // Convert a mongoose variable to regular object
  const userObject = user.toObject();
  // Should not return password and token
  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();

  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then(() => {
    return token;
  });
};

const User = mongoose.model('User', UserSchema);

// const newUser = new User({
//   email: 'test@email.com'
// });
// newUser.save().then(docs => {
//   console.log(JSON.stringify(docs, undefined, 2));
// }, err => {
//   console.log('Unable to create new user', err);
// });

module.exports = { User };
