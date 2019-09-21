import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, Link } from 'react-router-dom';

import IndexWeb from './web/IndexWeb';
import IndexAdmin from './admin/IndexAdmin';
import StartingPage from './startingPage'

import localeModule from '../store/modules/locale';
const localeActions = localeModule.actions;
import usersModule from '../store/modules/users';
const usersActions = usersModule.actions;
import { initTranslate, translate } from '../lib/translater';

class App extends Component {

  constructor(props){
    super(props);
    props.getUsers();
    props.fetchAllLocales();
    props.getLocale('en');
  }

  render(){
    initTranslate(this.props.locale);
    return(
      <div>
        <ul>
          <li><Link to='/web'>{translate('web')}</Link></li>
          <li><Link to='/admin'>{translate('admin')}</Link></li>
          <li><Link to='/'>{translate('starting page')}</Link></li>
        </ul>
        <div>
          <Route path="/web" component={IndexWeb} />
          <Route path="/admin" component={IndexAdmin} />
          <Route exact path="/" component={StartingPage}/>        
        </div>        
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    locale: state.locale.locale  
  }
}

export default connect(mapStateToProps,  Object.assign({}, localeActions, usersActions))(App);