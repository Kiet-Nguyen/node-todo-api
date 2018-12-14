const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

/**
  * INSTANCE METHODS
**/

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

UserSchema.methods.removeToken = function(token) {
  const user = this;

  return user.update({
    $pull: {
      tokens: {
        token: token
      }
    }
  });
};

/**
  * MODEL METHODS
**/

UserSchema.statics.findByToken = function(token) {
  const User = this;

  let decoded;
  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function(email, password) {
  const User = this;

  return User.findOne({email})
    .then(user => {
      if (!user) {
        return Promise.reject();
      }

      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            resolve(user);
          } else {
            reject();
          }
        });
      });
    });
};

// Mongoose middleware
UserSchema.pre('save', function(next) {
  const user = this;
  // Prevent hashing password second time when user updates account info, for example email.
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});


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
