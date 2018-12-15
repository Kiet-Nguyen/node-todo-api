const mongoose = require('mongoose');

// Todo model
const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  }
});

const Todo = mongoose.model('Todo', TodoSchema);

// const otherTodo = new Todo({
//   text: 'Feed the cat',
//   completed: true,
//   completedAt: 123
// });
// otherTodo.save().then(docs => {
//   console.log(JSON.stringify(docs, undefined, 2));
// }, err => {
//   console.log('Unable to save', err);
// });

module.exports = { Todo };
