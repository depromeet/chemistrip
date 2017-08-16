import React from "react";
import { connect } from "react-redux";
import { Field, SubmissionError, reduxForm } from "redux-form";
import { Form } from "react-bootstrap";
import { Container, Header, Button, Icon } from 'semantic-ui-react';
import {LinkContainer} from 'react-router-bootstrap';

import FormField from "../../components/auth/common/FormField";
import FormSubmit from "../../components/auth/common/FormSubmit";
import CenteredComponent from '../../common/CenteredComponent';

import config from '../../firebase_config.json';
import {TextField, FlatButton} from 'material-ui';

const tfStyle={
    color: '#ffffff',
}

class LoginInputField extends React.Component{
    render(){
        const {doValidate, meta} = this.props;
        if (doValidate) {
          return (
              <div>
            {this.content()}
            </div>
          );
        } else {
          return (
              <div>
                  {this.content()}
              </div>
          );
        }
    }
    content = () => {
        const {type, errorText, placeholder, iconName} = this.props;
        return(
            <div>
                <Icon name={iconName} style={{color:'#ffffff'}}/>
                <div style={{width: '90%', display: 'inline-block'}}>
                    <TextField
                        hintText={placeholder}
                        hintStyle={tfStyle}
                        inputStyle={tfStyle}
                        errorText={errorText}
                        fullWidth={true}
                        type={type}
                        underlineFocusStyle={{borderColor: '#2be3c7'}}
                    />
                </div>
            </div>
        );
    }
}
export class Login extends React.Component {
    state = {
        isLoginButtonSelected: false
    }
    // constructor
    constructor(props) {
        super(props);

        this.formSubmit = this.formSubmit.bind(this);
    }
    handleUsernameInput = (value) => {
    }
    handlePasswordInput = (value) => {
    }
    // render
    render() {
        const {user, handleSubmit, error, invalid, submitting} = this.props;
        const btStyle = {
            width: '48%',
    	    height: '56px',
    	    borderRadius: '4px',
    	    border: 'solid 1px rgba(255, 255, 255, 0.6)',
            color: '#ffffff',
        }
        return (
            <div style={{
                    backgroundImage: 'linear-gradient(151deg, #2be3c7, #2ab8f5)',
                }}>

                <Container text>
                    <Container textAlign="center" style={{color: '#ffffff', marginTop: '130px', marginBottom: '80px'}}>케미스트립</Container>
                    <Form onSubmit={handleSubmit(this.formSubmit)}>
                        <Field component={LoginInputField} name="username" placeholder="Username" iconName="user" doValidate={true}/>
                        <Field component={LoginInputField} name="password" type="password" placeholder="Password" iconName="lock" doValidate={true}/>
                        <br/>
                        <FormSubmit error="" submitting={submitting} buttonSaveLoading="Logging..."
                            buttonSave="케미스트립 계정으로 시작하기"/>
                        <Container style={{color: '#ffffff', fontSize: '12px'}} textAlign="center">or</Container>
                    </Form>
                    <Container textAlign="center" style={{marginTop: '10px', marginBottom: '400px'}}>
                        <FlatButton style={btStyle} hoverColor="#2be3c7">google</FlatButton>&nbsp;
                        <FlatButton style={btStyle} hoverColor="#2be3c7">facebook</FlatButton>
                    </Container>
                </Container>
            </div>
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
