const express = require('express');
const router = express.Router();
const _ = require('lodash');

const { getDB } = require('../db/index');

router.get('/api/articles', async function(req, res){
  const db = getDB();
  let articles = await db.collection('article').find().toArray();
  if(!articles){
    articles = [];
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(articles));
});

router.get('/api/article', async function(req, res){
  const db = getDB();
  let { articleId } = req.query;
  let article = await db.collection('article').findOne({ _id: db.ObjectId(articleId) });
  if(!article){
    article = {};
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(article));
});

router.post('/api/article', async function(req, res){
  const db = getDB();
  let newArticle = req.body;
  await db.collection('article').save(newArticle);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(newArticle));
});

router.put('/api/article', async function(req, res){
  const db = getDB();
  let newArticle = _.omit(req.body, '_id');
  let { articleId } = req.query;
  let article = await db.collection('article').findOne({ _id: db.ObjectId(articleId) });
  article = Object.assign({}, article, newArticle);
  await db.collection('article').save(article);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(article));
});

router.delete('/api/article', async function(req, res){
  const db = getDB();
  let { articleId } = req.query;
  await db.collection('locale').remove({ _id: db.ObjectId(articleId) }, { justOne: true });
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ ok: true }));
});

router.put('/api/article/coments', async function(req, res){
  const db = getDB();
  let comments = req.body;
  let { articleId } = req.query;
  let article = await db.collection('article').findOne({ _id: db.ObjectId(articleId) });
  article = Object.assign({}, article, { comments: _.concat(article.comments, comments) });
  await db.collection('article').save(article);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(article)); 
});

module.exports = router;