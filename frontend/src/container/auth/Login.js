import React from "react";
import { connect } from "react-redux";
import { Field, SubmissionError, reduxForm } from "redux-form";
import { Form } from "react-bootstrap";
import { Container, Header, Button } from 'semantic-ui-react';
import {LinkContainer} from 'react-router-bootstrap';

import FormField from "../../components/auth/common/FormField";
import FormSubmit from "../../components/auth/common/FormSubmit";
import CenteredComponent from '../../common/CenteredComponent';

import config from '../../firebase_config.json';
import firebase from 'firebase';

export class Login extends React.Component {

    // constructor
    constructor(props) {
        super(props);

        this.formSubmit = this.formSubmit.bind(this);
    }
    // render
    render() {
        const {user, handleSubmit, error, invalid, submitting} = this.props;
        return (
            <CenteredComponent>
                <Container text>
                    <Header style={{marginBottom: '30px'}}>트렌즈 - 친구들과 여행을</Header>
                    <Form onSubmit={handleSubmit(this.formSubmit)}>
                        <Field component={FormField} name="username" label="아이디" placeholder="아이디를 입력하세요." doValidate={true}/>
                        <Field type="password" component={FormField} name="password" placeholder="비밀번호를 입력하세요" label="비밀번호" doValidate={true}/>

                        <FormSubmit error={error} invalid={invalid} submitting={submitting} buttonSaveLoading="로그인 중..."
                            buttonSave="로그인"/>
                    </Form>
                </Container>
                <Container text textAlign="right">
                    <LinkContainer to="/signup">
                        <Button.Group floated='right'>
                            <Button>회원가입</Button>
                        </Button.Group>
                    </LinkContainer>
                </Container>
            </CenteredComponent>
        );
    }

    // submit the form
    formSubmit(values) {
        console.log(values);
    }
}

export default reduxForm({
    form: 'login',
    validate: function (values) {
        const errors = {};
        if(!values.username){
            errors.username = '아이디를 입력하세요';
        }
        if(!values.password){
            errors.password = '패스워드를 입력하세요';
        }
        return errors;
    },
})(Login);
