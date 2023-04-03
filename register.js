const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const url = 'mongodb+srv://admin:mHPGtrYiZyLwrip5@shard1.fafgqgb.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'users';
const collectionName = 'accounts';
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  MongoClient.connect(url, (err, client) => {
    if (err) throw err;
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    collection.insertOne({ username, password }, (err, result) => {
      if (err) throw err;
      res.send('User registered successfully!');
      client.close();
    });
  });
});
//app.listen(port, () => {
//  console.log(``);
//});
