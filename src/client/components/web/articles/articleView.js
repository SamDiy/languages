import React, { Component } from 'react';
import _ from 'lodash';
import { translate } from '../../../lib/translater';
import moment from 'moment';

import ArticleComment from './articleComment';

class ArticleView extends Component {

  constructor(props) {
    super(props);
    this.onSendNewComment = this.onSendNewComment.bind(this);
    this.state = { newCommentText: "" };
  }

  onSendNewComment(){
    this.setState({ newCommentText: "" });
    this.props.onSendNewComment({ text: this.state.newCommentText, date: moment(), author: window.localStorage.getItem('userToken') });
  }

  render(){
    return(
      <div>
        <div style={{ textAlign: 'end' }}>
          <button onClick={() => this.props.onSelectArticle()} className="m-1 btn btn-secondary">{translate('back')}</button>
        </div>
        <div className="article-view">
          <p className="h3 article-title">{this.props.selectedArticle.name || ""}</p>
          <p>{this.props.selectedArticle.description || ""}</p>
          <div className="p-3 article-text">
            <p>{this.props.selectedArticle.text || ""}</p>
          </div>
          <div style={{ textAlign: 'end' }}>
            <span>{this.props.selectedArticle.date}</span>
          </div>
        </div>
        <div className="comments-arial">
          <div className="commnt-form">
            <div className="form-group">
              <label htmlFor="new-comment">{translate('write here your comment')}</label>
              <textarea onChange={(event) => this.setState({ newCommentText: event.target.value })} className="form-control" id="new-comment" rows="3" value={this.state.newCommentText}></textarea>
            </div>
            <div style={{ textAlign: 'end' }}>
              <button onClick={() => this.onSendNewComment()} type="button" className="btn btn-secondary">{translate('send comment')}</button>
            </div>
          </div>
          <div>
            <ul>
              { _.map(this.props.selectedArticle.comments, (comment, index) => 
                <ArticleComment key={index} user={this.props.user} comment={comment} index={index}/>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }

}

export default ArticleView;