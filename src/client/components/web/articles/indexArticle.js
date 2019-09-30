import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import articlesModule from '../../../store/modules/article';
const articleActions = articlesModule.actions;

class IndexArticle extends Component {

  constructor(props){
    super(props);
    props.getArticleNames();
  }
  
  render(){
    return(
      <div className="row">
        <div className="col-12">

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