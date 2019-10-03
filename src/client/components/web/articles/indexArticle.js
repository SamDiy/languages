import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import articlesModule from '../../../store/modules/article';
const articleActions = articlesModule.actions;

import ArticleList from './articleList';
import ArticleView from './articleView';

class IndexArticle extends Component {

  constructor(props) {
    super(props);
    props.getArticleNames();
    this.onSelectArticle = this.onSelectArticle.bind(this);
    this.onSendNewComment = this.onSendNewComment.bind(this);
  }

  onSelectArticle(articleId) {
    if(_.isEmpty(articleId)){
      this.props.selectArticle();
    } else {
      this.props.selectRemoteArticle(articleId);
    }
  }

  onSendNewComment(newComment){
    let articleId = this.props.selectedArticle._id;
    if(articleId){
      this.props.addNewComment(articleId, newComment);
    }
  }
  
  render(){
    return(
      <div className="row">
        <div className="col-12">
          { _.isEmpty(this.props.selectedArticle) ? 
            <ArticleList onSelectArticle={this.onSelectArticle} articleNames={this.props.articleNames}/>
            :
            <ArticleView onSendNewComment={this.onSendNewComment} onSelectArticle={this.onSelectArticle} selectedArticle={this.props.selectedArticle}/>  
          }
        </div>        
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    articleNames: state.articles.articleNames || [],
    selectedArticle: state.articles.selectedArticle || {}
  }
}

export default connect(mapStateToProps, articleActions)(IndexArticle);