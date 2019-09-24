import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from '../../../lib/translater';
import Select from 'react-select';

import testModule from '../../../store/modules/test';
const testActions = testModule.actions;

class TestForm extends Component {

  constructor(props){
    super(props);
    this.onChangeData = this.onChangeData.bind(this);
    this.onSaveTest = this.onSaveTest.bind(this);
    this.onAddNewQuestion = this.onAddNewQuestion.bind(this);
  }

  onChangeData(name, value){
    this.props.changeSelectedTestData(name, value);
  }

  onSaveTest(){
    if(this.props.selectedTest._id){
      this.props.saveTest(this.props.selectedTest);
    }else {
      this.props.addNewTest(this.props.selectedTest);
    }
  }

  onAddNewQuestion(){
    let questions = [];
    if(this.props.selectedTest.questions){
      questions = this.props.selectedTest.questions.slice();
    }
    questions.push({});
    this.onChangeData('questions', questions);
  }

  render(){
    return(
      <div className="mt-2 mr-3">
        <div>
          <button onClick={this.onSaveTest} type="button" className="btn btn-light save-button">{translate('save')}</button>
        </div>
        <div>
          <div className="form-group">
            <label htmlFor="test-name">{translate('test name')}</label>
            <input onChange={(event) => this.onChangeData('name', event.target.value)} ref="testName" type="text" className="form-control mb-2" id="test-name" value={this.props.selectedTest.name || ""} placeholder={translate('test name')} />
            <button onClick={() => this.onAddNewQuestion()} type="button" className="btn btn-light save-button mb-2">{translate('add question')}</button>
            <ul>
              {this.props.selectedTest.questions && this.props.selectedTest.questions.map((question, index) => 
                <li key={index}>
                  <label htmlFor={`text-questio-${index}`}>{`${translate('text question')} ${index + 1}`}</label>
                  <textarea onChange={(event) => this.onChangeData(`questions[${index}].text`, event.target.value)} id={`text-questio-${index}`} className="form-control" value={question.text || ""}></textarea>
                  <input onChange={(event) => this.onChangeData(`questions[${index}].price`, event.target.value)} className="form-control mt-1" type="number" value={question.price || ""}/>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state){
  return {
    selectedTest: state.test.selectedTest || {}
  }
}

export default connect(mapStateToProps, Object.assign({}, testActions))(TestForm);