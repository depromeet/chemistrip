import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Button} from 'semantic-ui-react';
import ReactSwipe from 'react-swipe';
import {withRouter} from 'react-router-dom';

class QNAPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            swipeIndex: 0,
            questions: [
                "질문 1","질문 2", "질문 3", "질문 종료!!"
            ],
            answer: [
                true, true, true
            ]
        }
    }
    OXCallBack = (bOX) => {
        this.refs.reactSwipe.next();

        if(this.state.swipeIndex+1 >= this.state.questions.length)
            this.props.history.push('/date-selection');

        let cpAnswer = this.state.answer;
        cpAnswer[this.state.swipeIndex] = bOX;
        this.setState({
            answer: [
                ...cpAnswer
            ]
        });

        console.log(this.state.answer);
    }
    render() {
        const questionMaps = (questions) => {
            return questions.map( (question, i) => {
                return (
                    <div>{question}</div>
                );
            });
        }
        return(
            <div>
				<ReactSwipe
                    ref="reactSwipe"
                    swipeOptions={{
                            continuous: false,
                            callback: (index, elem) => {
                                this.setState({
                                    swipeIndex: index,
                                });
                            }
                        }}>
	                {questionMaps(this.state.questions)}
            	</ReactSwipe>
				<div>
		          <Button onClick={() => {this.OXCallBack(true)}}>O</Button>
		          <Button onClick={() => {this.OXCallBack(false)}}>X</Button>
				  <Button onClick={() => {this.refs.reactSwipe.prev()}}>이전</Button>
		        </div>
            </div>
        );
    }
}

export default withRouter(QNAPage);
