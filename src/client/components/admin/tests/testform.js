import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from '../../../lib/translater';
import Select from 'react-select';
import _ from 'lodash';

import testModule from '../../../store/modules/test';
const testActions = testModule.actions;

class TestForm extends Component {

  constructor(props){
    super(props);
    this.onChangeData = this.onChangeData.bind(this);
    this.onSaveTest = this.onSaveTest.bind(this);
    this.onAddNewQuestion = this.onAddNewQuestion.bind(this);
    this.onAddNewAnswer = this.onAddNewAnswer.bind(this);
    this.onAnswerTextChange = this.onAnswerTextChange.bind(this);
    this.onAnswerrightChange = this.onAnswerrightChange.bind(this);
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

  onAddNewAnswer(questionIndex){
    let question = Object.assign({}, this.props.selectedTest.questions[questionIndex]);
    let answers = question.answers || [];
    answers.push({});
    question.answers = answers;
    this.onChangeData(`questions[${questionIndex}]`, question);
  }

  onAnswerTextChange(questionIndex, answerIndex, value){
    this.onChangeData(`questions[${questionIndex}].answers[${answerIndex}].text`, value);
  }

  onAnswerrightChange(questionIndex, answerIndex, value){
    this.onChangeData(`questions[${questionIndex}].answers[${answerIndex}].right`, value);
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
              {_.map(this.props.selectedTest.questions, (question, questionIndex) => 
                <li key={questionIndex}>
                  <label htmlFor={`text-questio-${questionIndex}`}>{`${translate('text question')} ${questionIndex + 1}`}</label>
                  <textarea onChange={(event) => this.onChangeData(`questions[${questionIndex}].text`, event.target.value)} id={`text-questio-${questionIndex}`} className="form-control" value={question.text || ""}></textarea>
                  <input onChange={(event) => this.onChangeData(`questions[${questionIndex}].price`, event.target.value)} className="form-control mt-1 mb-2" type="number" value={question.price || ""}/>
                  <button onClick={() => this.onAddNewAnswer(questionIndex)} type="button" className="btn btn-light save-button mb-2">{translate('add answer')}</button>
                  <ul>
                    {_.map(question.answers, (answer, answerIndex) => 
                      <li key={`${questionIndex}-${answerIndex}`}>
                        <div className="answer-container">
                          <div class="form-group answer-text">
                            <label class="form-check-label" htmlFor={`text-answer-${questionIndex}-${answerIndex}`}>{`${translate('text answer')} ${answerIndex + 1}`}</label>
                            <textarea onChange={(event) => this.onAnswerTextChange(questionIndex, answerIndex, event.target.value)} id={`text-answer-${questionIndex}-${answerIndex}`} className="form-control" value={answer.text || ""}></textarea>
                          </div>
                          <div class="form-group form-check answer-checkbox ml-1">
                            <input onChange={(event) => this.onAnswerrightChange(questionIndex, answerIndex, event.target.checked)} type="checkbox" class="form-check-input" id={`right-answer-${questionIndex}-${answerIndex}`} checked={answer.right || false}/>
                            <label class="form-check-label" htmlFor={`right-answer-${questionIndex}-${answerIndex}`}>{translate('right answer')}</label>
                          </div>
                        </div>
                      </li>
                    )}
                  </ul>
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