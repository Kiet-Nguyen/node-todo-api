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
  // Delete many
  // db.collection('Todos')
  //   .deleteMany({ test: 'Eat lunch' })
  //   .then(result => {
  //     console.log(result);
  //   });
  db.collection('Users')
    .deleteMany({ name: 'Kiet' })
    .then(result => {
      console.log(result);
    });

  // Delete one
  // db.collection('Todos')
  //   .deleteOne({ text: 'Eat lunch' })
  //   .then(result => {
  //     console.log(result);
  //   });

  // Find one and delete
  // db.collection('Todos')
  //   .findOneAndDelete({ completed: false })
  //   .then(result => {
  //     console.log(result);
  //   });
  db.collection('Users')
    .findOneAndDelete({ _id: new ObjectID('5c0eabcd4cdb96458052e3a8') })
    .then(result => {
      console.log(result);
    });

  // client.close();
});
