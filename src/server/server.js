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
server.post('/api/users/signup', (req, res) => {
  req.body._id = new ObjectID();
  const document = req.body;
  db.collection('users').insertOne(document, (err, result) => {
    if (err) throw err;
    req.session.id = document._id;
    res.send(document._id);
  });
});

/*
  Signin.js ~ Read a user's email + password (check login match)
*/
server.post('/api/users/signin', (req, res) => {
  db.collection('users').findOne({ email: req.body.email }, (err, result) => {
    if (err) throw err;
    if (result.email === req.body.email && result.password === req.body.password) {
      req.session.id = result._id;
      res.send(result);
    }
  });
});

// ------------------------------------------------- //

/*
  Saves.js ~ Read a user's id (Send back Weights)
*/
// Route parametres example
server.get('/api/users/:id', (req, res) => {
  db.collection('users').findOne({ _id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// ------------------------------------------------- //

/*
  Signin.js ~ Read a user's email + password (check login match)
*/
server.put('/api/users/save', (req) => {
  const { weightId } = req.body;
  if (weightId === '') {
    db.collection('users').updateOne(
      { _id: new ObjectID(req.body.id) },
      {
        $push: {
          weights: {
            weight_id: new ObjectID(),
            name: req.body.geometry,
            geometry: req.body.geometry,
            subdivisions: req.body.subdivisions,
            adjacentWeight: req.body.adjacentWeight,
            edgePointWeight: req.body.edgePointWeight,
            connectingEdgesWeight: req.body.connectingEdgesWeight
          }
        }
      }
    );
  } else {
    // https://dba.stackexchange.com/questions/157149/how-can-i-update-a-single-field-in-an-array-of-embedded-documents
    db.collection('users').updateOne(
      { 'weights.weight_id': new ObjectID(weightId) },
      {
        $set: {
          'weights.$.name': req.body.geometry,
          'weights.$.geometry': req.body.geometry,
          'weights.$.subdivisions': req.body.subdivisions,
          'weights.$.adjacentWeight': req.body.adjacentWeight,
          'weights.$.edgePointWeight': req.body.edgePointWeight,
          'weights.$.connectingEdgesWeight': req.body.connectingEdgesWeight
        }
      }
    );
  }
  console.log('done');
});

// ------------------------------------------------- //

/*
  Delete
*/
server.put('/api/users/delete/:id', (req, res) => {
  const { id } = req.params;
  // console.log(id);
  // db.collection('users').deleteOne({ _id: new ObjectID(req.params.id) }, (err) => {
  //   if (err) return res.send(err);
  //   console.log('deleted from database');
  //   return res.send({ success: true });
  // });
  // db.collection('users').updateOne(
  //   // {'content.assets._id': ObjectId('4fc63def5b20fb722900010e')},
  //   { 'weights.weight_id': new ObjectID(id) },
  //   { $pull: { weights: { weight_id: new ObjectID(id) } } }
  // );

  db.collection('users').updateOne(
    { 'weights.weight_id': new ObjectID(id) },
    { $pull: { weights: { weight_id: new ObjectID(id) } } },
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

// ------------------------------------------------- //
