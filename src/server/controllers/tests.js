const express = require('express');
const router = express.Router();
const _ = require('lodash');

const { getDB } = require('../db/index');

router.get('/api/tests', async function(req, res){
  const db = getDB();
  let tests = await db.collection('test').find().toArray();
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(tests));
});

router.get('/api/tests/names', async function(req, res){
  const db = getDB();
  let names = await db.collection('test').find({}, { projection: { name: 1, _id: 1 }}).toArray();
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(names));
});

router.get('/api/test', async function(req, res){
  const db = getDB();
  let { testId } = req.query;
  let test = await db.collection('test').findOne({ _id: db.ObjectId(testId) });
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(test));
});

router.post('/api/test', async function(req, res){
  const db = getDB();
  let newTest = req.body;
  await db.collection('test').save(newTest);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(newTest));
});

router.put('/api/test', async function(req, res){
  const db = getDB();
  let { testId } = req.query;
  let newTest = _.omit(req.body, '_id');
  let test = await db.collection('test').findOne({ _id: db.ObjectId(testId) });
  test = Object.assign({}, test, newTest);
  await db.collection('test').save(test);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(test));
});

router.delete('/api/test', async function(req, res){
  const db = getDB();
  let { testId } = req.query;
  await db.collection('test').remove({ _id: db.ObjectId(testId) }, { justOne: true });
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ ok: true }));
});

module.exports = router;