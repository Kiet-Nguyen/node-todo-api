const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('../../models/todo');
const { User } = require('../../models/user');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();
const users = [
  {
    _id: userOneID,
    email: 'kiet@test.com',
    password: 'password!',
    tokens: [{
      access: 'auth',
      token: jwt.sign(
        {
          _id: userOneID,
          access: 'auth'
        },
        'abc123'
      ).toString()
    }]
  },
  {
    _id: userTwoID,
    email: 'bang@test.com',
    password: 'password2!'
  }
];

const todos = [
  {
    _id: new ObjectID(),
    text: 'First test todo'
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
  }
];

const populateTodos = done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
};

const populateUsers = done => {
  User.remove({})
    .then(() => {
      // Cannot use insertMany here as populateTodos
      // It won't run the middleware to save hash password
      const userOne = new User(users[0]).save();
      const userTwo = new User(users[1]).save();
      // Wait for both of users to succeed
      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};

module.exports = { todos, populateTodos, users, populateUsers };