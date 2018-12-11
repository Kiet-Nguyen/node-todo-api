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
  //   .findOneAndUpdate({ _id: new ObjectID('5c0f66aa4cdb96458052f428')}, {
  //     $set: {
  //       completed: true
  //     }
  //   }, {
  //     returnOriginal: false
  //   })
  //   .then(result => {
  //     console.log(result);
  //   });
  db.collection('Users')
    .findOneAndUpdate({
      _id: new ObjectID('5c0f6f895ac7fb4c0c4019a5')
    }, {
      $set: {
        name: 'Susu'
      },
      $inc: {
        age: 1
      }
    }, {
      returnOriginal: false
    })
    .then(result => {
      console.log(result);
    });


  // client.close();
});
