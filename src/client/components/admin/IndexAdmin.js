import React, { Component } from 'react';
import { connect } from 'react-redux';

import usersModule from '../../store/modules/users';
const userActions = usersModule.actions;
import { Route, Link, Redirect } from 'react-router-dom';

import { translate } from '../../lib/translater';

import UserList from './users/userList';
import LocaleList from './locale/lokaleList';
import ArticlesList from './articles/articlesList';

class IndexAdmin extends Component {

  addUser(){
    this.props.addUser({ name: this.refs.name.value, email: this.refs.email.value });
  }

  getUsers(){
    this.props.getUsers();
  }

  render(){
    return(
      <div>
        <Redirect from="/admin" to="/admin/users"/>
        <nav className="navbar navbar-light bg-light">
          <Link className="nav-link" to='/admin/users'>{translate('users')}</Link>
          <Link className="nav-link" to='/admin/articles'>{translate('articles')}</Link>
          <Link className="nav-link" to='#'>{translate('tests')}</Link>
          <Link className="nav-link" to='/admin/locale'>{translate('locales')}</Link>
          <Link className="nav-link" to='/'>{translate('web')}</Link>
        </nav>
        <div>
          <Route path="/admin/users" component={UserList} />
          <Route path="/admin/locale" component={LocaleList} />
          <Route path="/admin/articles" component={ArticlesList} />       
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

export default connect(mapStateToProps, Object.assign({}, userActions))(IndexAdmin);