const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

const id = '5c109d4c09b1980f04bc7611';

if (!ObjectID.isValid(id)) {
  console.log('ID not valid');
}

Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo', todo);
});

Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found.');
  }
  console.log('Todo By Id', todo);
}).catch(err => console.log(err));

User.findById('5c0fbefa8255366b3ba0dd34').then(user => {
  if (!user) {
    return console.log('User not found');
  }
  console.log('User: ', user);
}, err => {
  console.log(err);
});
