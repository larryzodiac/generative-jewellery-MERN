// ------------------------------------------------- //
// Evan MacHale - N00150552
// 22.02.19
// Express + MongoDB
// ------------------------------------------------- //
// https://expressjs.com/en/guide/database-integration.html#mongodb
// https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
// https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#create-database-directory
// ------------------------------------------------- //

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;

// ------------------------------------------------- //

/*
  22.02.19
  Installed Express + MongoDB :
    npm i express mongodb
  Installed MongoDB on Windows + MongoDB Compass :
    -> see links above
  Created directory + started mongoDB database on Windows :
    mkdir data/db
    "C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="c:\...path...\data\db"
  Opened Compass -> create new database, collection + document
  Installed Nodemon + run server:
    npm i -g nodemon
    nodemon server.js
*/

// ------------------------------------------------- //

app.get('/', (req, res) => res.send('Hello World!')); // localhost:3000
app.get('/api/users', (req, res) => res.send({id:1, name:'John', age:40})); // localhost:3000/api/users
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// ------------------------------------------------- //

/*
  Testing with node.js
*/

// MongoClient.connect('mongodb://localhost:27017/localhost-database', { useNewUrlParser: true }, function (err, client) {
//   if (err) throw err
//
//   const db = client.db('localhost-database');
//
//   db.collection('test').find().toArray(function (err, result) {
//     if (err) throw err
//     console.log('');
//     console.log(result);
//   });
// });

// ------------------------------------------------- //

/*
  22.02.19 (Same day)
  Created new cluster on MongoDB Atlas + collection/document
  MongoDB Compass can connect to Atlas using URI connection string
  // mongodb+srv://larryzodiac:1234@fourth-year-tawax.mongodb.net/admin
*/

// ------------------------------------------------- //

/*
  For viewing in the browser -> basis of how to integrate React
  Open @ http://localhost:3000/api/geometries
*/

app.get('/api/geometries', (req, res) => {
  MongoClient.connect('mongodb+srv://larryzodiac:1234@fourth-year-tawax.mongodb.net/admin', { useNewUrlParser: true }, function (err, client) {
    if (err) throw err

    var db = client.db('generative-jewellery'); // collection

    // Document
    db.collection('users').find().toArray(function (err, result) {
      if (err) throw err
      res.send(result);
    });
  })
});
