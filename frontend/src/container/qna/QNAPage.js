import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Button, Container, Image} from 'semantic-ui-react';
import ReactSwipe from 'react-swipe';
import {withRouter} from 'react-router-dom';
import {FloatingActionButton} from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import axios from 'axios';

import {DEFAULT_REQUEST_URL} from '../../constants';

const QNACard = ({question, imageSrc}) => (
    <div style={{textAlign: 'center'}}>
        <p style={{marginTop: '50px', fontSize: '23px'}}>{question}</p>
        <Image src={imageSrc} style={{marginTop: '49px'}}/>
    </div>
)

class QNAPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            swipeIndex: 0,
            questionDatas: [
                {
                    question: "레저스포츠 좋아하세요?",
                    imageSrc: "/test.png"
                },
                {
                    question: "게임 좋아하세요?",
                    imageSrc: "/test.png"
                },
                {
                    question: "서핑 좋아하세요?",
                    imageSrc: "/test.png"
                },
                {
                    question: "노는거 좋아하세요?",
                    imageSrc: "/test.png"
                },
                {
                    question: "질문 종료!",
                    imageSrc: "/test.png"
                }
            ],
            answer: [
                true, true, true, true, true
            ]
        }
    }
    submitData = async () => {
        const history = this.props.history;

        await Promise.all([axios.post(DEFAULT_REQUEST_URL + '/qna/',{
            firebaseToken: localStorage.getItem('chemistrip_token'),
            answer: this.state.answer
        })
                .then(response => {
                    history.push('/matching-result');
                    console.log(response.data);
                })
                .catch(error => {
                    history.push('/matching-result');
                    console.log(error);
                })
            ]);
    }
    OXCallBack = (bOX) => {
        this.refs.reactSwipe.next();

        if(this.state.swipeIndex+1 >= this.state.questionDatas.length)
            this.submitData();

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
				<Container text textAlign="center">
                    <AppBar
                        title={<span>{this.state.swipeIndex+1}/{this.state.questionDatas.length}</span>}
                        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                        />
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
		            <FloatingActionButton backgroundColor='#2ab8f5' onClick={() => {this.OXCallBack(false)}}>
                        <NavigationClose />
                    </FloatingActionButton>
				    <span style={{display: 'inline-block', color: '#b2b2b2', marginLeft: '32px', marginRight: '32px', marginBottom: '15px', cursor: 'pointer'}}
                        onClick={() => {this.refs.reactSwipe.prev()}}>
                        prev
                    </span>
                    <FloatingActionButton backgroundColor='#2be3c7' onClick={() => {this.OXCallBack(true)}}>
                        <ActionFavoriteBorder />
		            </FloatingActionButton>
		        </Container>
            </div>
        );
    }
}

export default withRouter(QNAPage);
