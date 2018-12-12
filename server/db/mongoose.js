const mongoose = require('mongoose');

const dbURL = {
  localhost: 'mongodb://localhost:27017/TodoApp',
  mLab: 'mongodb://Kian:kWbaztTU3djPZAk9HXQA,[oR@ds235833.mlab.com:35833/todo-app'
};
// Connect to database with mongoose
mongoose.connect(dbURL.localhost || dbURL.mlab, { useNewUrlParser: true });

module.exports = { mongoose };
