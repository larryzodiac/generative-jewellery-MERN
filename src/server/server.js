// ------------------------------------------------- //
// Evan MacHale - N00150552
// 02.03.19
// Backend Servers w/ Node, Express & MongoDB
// ------------------------------------------------- //
// https://expressjs.com/en/guide/database-integration.html#mongodb
// https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
// https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#create-database-directory
// https://expressjs.com/en/guide/routing.html
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

/*
  22.02.19 (Same day)
  Created new cluster on MongoDB Atlas + collection/document
  MongoDB Compass can connect to Atlas using URI connection string
  // mongodb+srv://larryzodiac:1234@fourth-year-tawax.mongodb.net/admin
*/

/*
  db.collection.insertOne({name:'joe'});
  db.collection.find();
  // find the record that matches 'joe' + set the record age to 7
  db.collection.updateOne({name:'joe'}, {$set: {age:7}});
  db.collection.deleteOne({name:'joe'});
*/

/*
  Note:
  When switching between servers make sure to change package.json
*/

// ------------------------------------------------- //

const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const express = require('express');

const server = express();
server.use(express.static('dist'));

const dbRoute = 'mongodb+srv://larryzodiac:1234@fourth-year-tawax.mongodb.net/admin'; // Atlas
// const dbRoute = 'mongodb://localhost:27017/localhost-database'; // localhost
const dbName = 'generative-jewellery';
let db;

// ------------------------------------------------- //

MongoClient.connect(dbRoute, (err, client) => {
  if (err) throw err;
  db = client.db(dbName);
  server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
});

// ------------------------------------------------- //

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// ------------------------------------------------- //

/*
  Create
*/
server.post('/api/users/create', (req, res) => {
  res.send('Got a POST request at /user');
});

// ------------------------------------------------- //

/*
  Read all users
*/
server.get('/api/users', (req, res) => {
  db.collection('users').find().toArray((err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

/*
  Read a single users' saved geometry weights
*/
// Route parametres example
server.get('/api/users/:username', (req, res) => {
  db.collection('users').find({ username: req.params.username }).toArray((err, result) => {
    if (err) throw err;
    console.log(result[0].weights);
    res.send(result[0].weights);
  });
});

/*
  Read a single users' specific geometry weight
*/
// server.get('/api/users/:username/weights/:name)', (req, res) => {
//   // db.collection('users').find({ 'weights.weight_id': req.params.weight_id }).toArray((err, result) => {
//   db.collection('users').find({ 'weights.name': ObjectId(req.params.name) }).toArray((err, result) => {
//     if (err) throw err;
//     console.log(req.params.name);
//     // console.log(result);
//     console.log('');
//     // const filtered = result.find(r => r.weights.some(w => w.weight_id === req.params.weight_id));
//     // const filtered = result.find(r => r.weights.find(w => console.log(w.weight_id)));
//     // const filtered2 = result.find(r => r.weights.some(w => w.weight_id === ObjectId(req.params.weight_id));
//
//
//     // const filtered = result.find(r => r.weights.some(w => w.name === req.params.name));
//     // console.log(filtered);
//
//
//     res.send(result);
//   });
// });

// ------------------------------------------------- //

/*
  Update
*/
server.put('/api/users/update', (req, res) => {
  res.send('Got a PUT request at /user');
});

// ------------------------------------------------- //

/*
  Delete
*/
server.delete('/api/users/update', (req, res) => {
  res.send('Got a DELETE request at /user');
});

// ------------------------------------------------- //
