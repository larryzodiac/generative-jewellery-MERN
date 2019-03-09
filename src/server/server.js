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
const { ObjectID } = require('mongodb');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session')

const server = express();
server.use(express.static('dist'));

const dbRoute = 'mongodb+srv://larryzodiac:1234@fourth-year-tawax.mongodb.net/admin'; // Atlas
// const dbRoute = 'mongodb://localhost:27017/localhost-database'; // localhost
const dbName = 'generative-jewellery';
let db;

// ------------------------------------------------- //

MongoClient.connect(dbRoute, { useNewUrlParser: true }, (err, client) => {
  if (err) throw err;
  db = client.db(dbName);
  server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
});

// ------------------------------------------------- //

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(session({
  saveUninitialized: false,
  secret: 'keyboard cat',
  cookie: {
    maxAge: 3600
  }
}));

// ------------------------------------------------- //

/*
  Signup.js ~ Create
*/
server.post('/api/users', (req, res) => {
  req.body._id = new ObjectID();
  const document = req.body;
  db.collection('users').insertOne(document, (err, result) => {
    if (err) throw err;
    // req.session.id = document._id;
    // res.send(req.session.id);
  });
});

/*
  Signin.js ~ Read a user's email + password (check login match)
*/
// Route parametres example
server.post('/api/users/signin', (req, res) => {
  db.collection('users').findOne({ email: req.body.email }, (err, result) => {
    if (err) throw err;
    console.log(result);
    if (result.email === req.body.email && result.password === req.body.password) {
      req.session.id = result._id;
      res.send(result);
    }
  });
});

// ------------------------------------------------- //

/*
  World.js ~ Read a user's id (double check token match)
*/
// server.get('/api/users/:id', (req, res) => {
//   db.collection('users').findOne({ _id: new ObjectID(req.params.id) }, (err, result) => {
//     if (err) throw err;
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
