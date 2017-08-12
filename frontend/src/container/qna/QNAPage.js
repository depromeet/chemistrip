import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Button, Container, Image} from 'semantic-ui-react';
import ReactSwipe from 'react-swipe';
import {withRouter} from 'react-router-dom';
import {FloatingActionButton} from 'material-ui';

const QNACard = ({question, imageSrc}) => (
    <Container text textAlign="center">
        <p>{question}</p>
        <Image src={imageSrc} />
    </Container>
)

class QNAPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            swipeIndex: 0,
            questionDatas: [
                {
                    question: "질문 1",
                    imageSrc: "/test.png"
                },
                {
                    question: "질문 2",
                    imageSrc: "/test.png"
                },
                {
                    question: "질문 종료!",
                    imageSrc: "/test.png"
                }
            ],
            answer: [
                true, true, true
            ]
        }
    }
    OXCallBack = (bOX) => {
        this.refs.reactSwipe.next();

        if(this.state.swipeIndex+1 >= this.state.questionDatas.length)
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
        const questionMaps = (questionDatas) => {
            return questionDatas.map( (questionData, i) => {
                return (
                    <div>
                        <QNACard question={questionData.question} imageSrc={questionData.imageSrc}/>
                    </div>
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
	                {questionMaps(this.state.questionDatas)}
            	</ReactSwipe>
				<Container text textAlign="center">
		            <FloatingActionButton onClick={() => {this.OXCallBack(true)}}/>
		            <FloatingActionButton onClick={() => {this.OXCallBack(false)}}/>
				    <FloatingActionButton onClick={() => {this.refs.reactSwipe.prev()}}/>
		        </Container>
            </div>
        );
    }
}

export default withRouter(QNAPage);
