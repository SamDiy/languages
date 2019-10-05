import React, { Component } from 'react';
import { connect } from 'react-redux';

import testModule from '../../../store/modules/test';
const testActions = testModule.actions;

import TestList from './testList';

class IndexTest extends Component {

  constructor(props){
    super(props);
    props.getTestNames();
  }

  render(){
    return(
      <div>
        <TestList testNames={this.props.testNames}/>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    testNames: state.test.testNames
  }
}

export default connect(mapStateToProps, testActions)(IndexTest);