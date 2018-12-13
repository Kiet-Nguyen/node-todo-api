const mongoose = require('mongoose');

// Connect to database with mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

module.exports = { mongoose };
