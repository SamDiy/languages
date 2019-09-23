const express = require('express');
const router = express.Router();

const { getDB } = require('../db/index');

router.get('/api/tests', async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ ok: true }));
});

router.post('/api/test', async function(req, res){
  const db = getDB();
  let newTest = req.body;
  await db.collection('test').save(newTest);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(newTest));
});

module.exports = router;