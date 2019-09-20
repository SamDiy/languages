import React, { Component } from 'react';
import { connect } from 'react-redux';

import { translate } from '../../../lib/translater';

import articlesModule from '../../../store/modules/article';
const articleActions = articlesModule.actions;

class ArticleForm extends Component{

  onChangeArticleData(name, value){
    // console.log({ name, value });
    this.props.changeArticleData(name, value);
  }
  
  render(){
    return(
      <div className="mr-3">
        <p>ArticleForm</p>
        <label>{translate('name')}</label>
        <input onChange={(event) => this.onChangeArticleData('name', event.target.value)} type="text" className="form-control" value={this.props.selectedArticle.name || ""}/>
        <label>{translate('text')}</label>
        <textarea onChange={(event) => this.onChangeArticleData('text', event.target.value)} rows="15" className="form-control" value={this.props.selectedArticle.text || ""}/>
        <div>
          <label className="mr-2">{translate('date')}</label>
          <span>{this.props.selectedArticle.date || ""}</span>
        </div>
        <div>
          <label className="mr-2">{translate('autor')}</label>
          <span>{this.props.selectedArticle.author || ""}</span>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state){
  return {
    selectedArticle: state.articles.selectedArticle || {}
  }
}

export default connect(mapStateToProps, Object.assign({}, articleActions))(ArticleForm);