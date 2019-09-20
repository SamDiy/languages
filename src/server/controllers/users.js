const express = require('express');
const router = express.Router();
const _ = require('lodash');

const { getDB } = require('../db/index');

router.get('/api/users', async function(req, res){
  const db = getDB();
  let users = await db.collection('user').find().toArray();
  if(!users){
    users = {};
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(users));
});

router.get('/api/user', async function(req, res){
  const db = getDB();
  let { userId } = req.query;
  let user = await db.collection('user').findOne({ _id: userId });
  if(!user){
    user = {};
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(user));
});

router.post('/api/user', async function(req, res){
  const db = getDB();
  let newUser = req.body;
  await db.collection('user').save(newUser);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(newUser));
});

router.put('/api/user', async function(req, res){
  const db = getDB();
  let newUser = req.body;
  newUser = _.omit(newUser, '_id');
  let { userId } = req.query;
  let user = await db.collection('user').findOne({ _id: db.ObjectId(userId)});
  user = Object.assign({}, user, newUser);
  await db.collection('user').save(user);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(user));
});

router.delete('/api/user', async function(req, res){
  const db = getDB();
  let { userId } = req.query;
  await db.collection('user').remove({ _id: db.ObjectId(userId) }, { justOne: true });
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ ok: true }));
});

module.exports = router;