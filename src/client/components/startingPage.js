import React, { Component } from 'react';
import { connect } from 'react-redux';

import { translate } from '../lib/translater';
import usersModule from '../store/modules/users';
const usersActions = usersModule.actions;

class StartingPage extends Component{

  constructor(props){
    super(props);
    this.onEnter = this.onEnter.bind(this);
  }

  onEnter(){
    // console.log(this.refs.loginEmail.value, this.refs.password.value);
    this.props.userSignIn(this.refs.loginEmail.value, this.refs.password.value);
  }

  render(){
    return(
      <div className="enter-form">
        <form>
          <div className="form-group">
            <label>{translate('Login or email')}</label>
            <input ref="loginEmail" type="text" className="form-control" placeholder={translate('login or email')} required></input>
          </div>
          <div className="form-group">
            <label>{translate('Password')}</label>
            <input ref="password" type="password" className="form-control" required placeholder={translate('password')}></input>
          </div>
          <button onClick={() => this.onEnter()} className="btn btn-secondary" type="button">{translate('enter')}</button>
        </form>
      </div>
    );
  }

}

function mapStateToProps(state){
  return {}
}

export default connect(mapStateToProps, usersActions)(StartingPage);