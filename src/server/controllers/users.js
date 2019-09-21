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

router.get('/api/singIn', async function(req, res){
  const db = getDB();
  let { userLogin, userPassword } = req.query;
  let user = await db.collection('user').findOne({ $or: [{ name: userLogin }, { email: userLogin }]});
  res.setHeader('Content-Type', 'application/json');
  if(user && _.isEqual(user.password, userPassword)){
    res.send(JSON.stringify(_.omit(user, 'password')));
  }else{
    res.status(500).send(JSON.stringify({ ok: false, message: "User was not found or password is wrong" }));
  }  
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
  let newUser = _.omit(req.body, '_id');
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