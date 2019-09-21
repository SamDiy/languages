import { createAction, handleActions } from 'redux-actions';
import { call, put, takeEvery, takeLatest, actionChannel } from 'redux-saga/effects';
import axios from 'axios';
import config from '../../config/config.api';
import _ from 'lodash';

// Actions
const actions = {
  getAticles: createAction('GET_ATICLES'),
  selectArticle: createAction('SELECT_ARTICLE', (articleId) => {return { articleId }}),
  changeArticleData: createAction('CHANGE_ARTICLE_DATA', (fieldName, value) => { return { fieldName, value }}),
  addNewArticle: createAction('ADD_NEW_ARTICLE', (article) => {return { article }}),
  saveArticle: createAction('SAVE_ARTICLE', (article) => { return { article }})
};

// Sagas
function* sagaGetAticles(action){
  yield put({ type: 'GET_ATICLES_STARTED' });
  try{
    let result = yield axios.get(`${config.baseUrl}articles`);
    yield put({ type: 'GET_ATICLES_SUCCEEDED', payload: { articles: result.data }});
  }catch(error){
    console.log(error);
    yield put({ type: 'GET_ATICLES_ERROR' });
  }
}

function* sagaAddNewArticle(action){
  yield put({ type: 'ADD_NEW_ARTICLE_STARTED' });
  try{
    let result = yield axios.post(`${config.baseUrl}article`, action.payload.article);
    yield put({ type: 'ADD_NEW_ARTICLE_SUCCEEDED', payload: { newArticle: result.data }});
  }catch(error){
    console.log(error);
    yield put({ type: 'ADD_NEW_ARTICLE_ERROR' });
  }
}

function* sagaSaveArticle(action){
  yield put({ type: 'SAVE_ARTICLE_STARTED' });
  try{
    let result = yield axios.put(`${config.baseUrl}article`, action.payload.article, { params: { articleId: action.payload.article._id }});
    yield put({ type: 'SAVE_ARTICLE_SUCCEEDED' });
  }catch(error){
    console.log(error);
    yield put({ type: 'SAVE_ARTICLE_ERROR' });
  }
}

function* rootSaga(){
  yield takeEvery('GET_ATICLES', sagaGetAticles),
  yield takeEvery('ADD_NEW_ARTICLE', sagaAddNewArticle),
  yield takeEvery('SAVE_ARTICLE', sagaSaveArticle)
}

// Reducers
const reducers = handleActions({
  'GET_ATICLES_SUCCEEDED': (state, action) => {
    return Object.assign({}, state, { articles: action.payload.articles });
  },
  'SELECT_ARTICLE': (state, action) => {
    let article = _.find(state.articles, { _id: action.payload.articleId });
    if(!article)
      article = {};
    return Object.assign({}, state, { selectedArticle: article });
  },
  'CHANGE_ARTICLE_DATA': (state, action) => {
    let article = Object.assign({}, state.selectedArticle);
    let articleData = {};
    articleData[action.payload.fieldName] = action.payload.value;
    article = Object.assign({}, article, articleData);
    return Object.assign({}, state, { selectedArticle: article });
  },
  'ADD_NEW_ARTICLE_SUCCEEDED': (state, action) => {
    let articles = state.articles.slice();
    articles.push(action.payload.newArticle);
    return Object.assign({}, state, { articles, selectedArticle: action.payload.newArticle });
  }
}, { articles: [], selectedArticle: {}});

export default { actions, reducers, rootSaga: rootSaga };