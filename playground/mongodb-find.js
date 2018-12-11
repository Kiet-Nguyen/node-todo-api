const { MongoClient, ObjectID } = require('mongodb');

// Database name
const dbName = 'TodoApp';
// Connection URL
const url = `mongodb://localhost:27017/${dbName}`;

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  const db = client.db(dbName);
  // db.collection('Todos')
  //   .find({
  //     _id: new ObjectID('5c0e84c6544d911c7920fb3c'),
  //   })
  //   .toArray()
  //   .then(docs => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, err => {
  //   console.log('Unable to fetch Todos', err);
  // });

  // db.collection('Todos')
  //   .find()
  //   .count()
  //   .then(count => {
  //   console.log(`Todos count: ${count}`);
  // }, err => {
  //   console.log('Unable to fetch Todos', err);
  // });

  db.collection('Users')
    .find({name: 'Kiet'})
    .toArray()
    .then(users => {
      console.log(JSON.stringify(users, undefined, 2));
    }, err => {
      if (err) {
        console.log('Unable to fetch Todos', err);
      }
    });

  // client.close();
});
