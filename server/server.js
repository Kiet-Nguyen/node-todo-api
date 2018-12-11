const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

const dbName = 'TodoApp';
const url = `mongodb://localhost:27017/${dbName}`;
// Connect to database with mongoose
mongoose.connect(url, { useNewUrlParser: true });

// Todo model
const todoSchema = new mongoose.Schema({
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

const Todo = mongoose.model('Todo', todoSchema);

// const newTodo = new Todo({
//   text: 'Grocery shopping'
// });
// newTodo.save().then(docs => {
//   console.log('Saved todo', docs);
// }, e => {
//   console.log('Unable to save todo', err);
// });

const otherTodo = new Todo({
  text: 'Feed the cat',
  completed: true,
  completedAt: 123
});
otherTodo.save().then(docs => {
  console.log(JSON.stringify(docs, undefined, 2));
}, e => {
  console.log('Unable to save', e);
});
