const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
// kWbaztTU3djPZAk9HXQA,[oR
const app = express();
const port = process.env.PORT || 9999;
// Middleware
app.use(bodyParser.json());

// POST
app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then(doc => {
    res.send(doc);
  }, err => {
    res.status(400).send(err);
  });
});

// GET
app.get('/todos', (req, res) => {
  Todo.find().then(todos => {
    res.send({todos});
  }, err => {
    res.status(400).send(err);
  });
});

// GET TODO BY ID
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  // Validate id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id)
    .then(todo => {
      // The call is succeed, but ID is not found in the collection
      if (!todo) {
        return res.status(404).send();
      }

      res.send({todo});
    })
    .catch( err => {
      res.status(400).send();
    });
});

// DELETE
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  // Validate id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({todo});
    })
    .catch(err => {
      res.status(400).send();
    });
});

app.listen(port, () => {
  console.log(`Starting on port ${port}`);
});

module.exports = { app };
