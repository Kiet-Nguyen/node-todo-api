const mongoose = require('mongoose');

const dbName = 'TodoApp';
const url = `mongodb://localhost:27017/${dbName}`;
// Connect to database with mongoose
mongoose.connect(url, { useNewUrlParser: true });

module.exports = { mongoose };
