import React, { Component } from 'react';
import { connect } from 'react-redux';
// import _ from 'lodash';

import { translate } from '../../../lib/translater';

import articlesModule from '../../../store/modules/article';
const articleActions = articlesModule.actions;

import ArticleForm from './articleForm';

class ArticlesList extends Component{

  constructor(props){
    super(props);
    props.getAticles();
    this.onOpenArticle = this.onOpenArticle.bind(this);
  }

  onOpenArticle(articleId){
    this.props.selectArticle(articleId);
  }

  render(){
    return(
      <div>
        <h3 className="ml-2">{translate('articles')}</h3>
        <div className="row">
            <div className="col-4">
              <ul>
                {this.props.articles.map((article) =>
                  <li key={article._id}>
                    <span>{article.name}</span>
                    <button onClick={() => this.onOpenArticle(article._id)} type="button" className="btn btn-link">{translate('open')}</button>
                    <button type="button" className="btn btn-link">{translate('delete')}</button>
                  </li>
                )}
              </ul>
            </div>
            <div className="col-8">
                <ArticleForm/>
            </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state){
  return {
    articles: state.articles.articles || []
  }
}

export default connect(mapStateToProps, Object.assign({}, articleActions))(ArticlesList);