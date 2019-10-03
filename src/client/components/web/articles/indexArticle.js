import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import articlesModule from '../../../store/modules/article';
const articleActions = articlesModule.actions;

import ArticleList from './articleList';
import ArticleView from './articleView';
import moment from 'moment';

class IndexArticle extends Component {

  constructor(props) {
    super(props);
    props.getArticleNames();
    this.onSelectArticle = this.onSelectArticle.bind(this);
    this.onSendNewComment = this.onSendNewComment.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    moment.lang(props.localeName || 'en');
  }

  componentDidUpdate(prevProps) {
    if(prevProps.localeName != this.props.localeName){
      moment.lang(this.props.localeName || 'en');
    }
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
            <ArticleView user={this.props.user} onSendNewComment={this.onSendNewComment} onSelectArticle={this.onSelectArticle} selectedArticle={this.props.selectedArticle}/>  
          }
        </div>        
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    localeName: state.locale.localeName,
    articleNames: state.articles.articleNames,
    selectedArticle: state.articles.selectedArticle,
    user: state.users.currentUser
  }
}

export default connect(mapStateToProps, articleActions)(IndexArticle);