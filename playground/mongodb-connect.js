const { MongoClient, ObjectID } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017/TodoApp';
// Database name
const dbName = 'TodoApp';

const obj = new ObjectID();

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  const db = client.db(dbName);
  // Todos collection
  // db.collection('Todos').insertOne({
  //   test: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert Todos.', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // Users collection
  // db.collection('Users').insertOne({
  //   name: 'Kiet',
  //   age: 34,
  //   location: 'On earth'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert Users', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });
  //
  // client.close();
});
