import React, {Component} from 'react';
import config from '../../firebase_config.json';
import * as firebase from 'firebase';
import {LoginForm} from '../../components/auth';
import {withRouter} from 'react-router-dom';
import {Confirm} from 'semantic-ui-react';

firebase.initializeApp(config);

class Login extends Component {
    state = {
        submitting : false,
        open: false,
        message: "",
    }
    show = (message) => this.setState({open: true, message})
    handleConfirm = () => this.setState({open: false })
    handleCancel = () => this.setState({ open: false })

    handleSubmit = async (values) => {
        this.setState({submitting : true});

        const that = this;

        await firebase.auth().signInWithEmailAndPassword(values.email, values.password)
        .then(function(response){
            console.log(response.code);
            that.props.history.push("/profile-input");
        })
        .catch(function(error) {
            if(error.code === 'auth/user-not-found')
            {
                firebase.auth().createUserWithEmailAndPassword(values.email, values.password).catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    console.log(errorCode, errorMessage);
                });
                console.log(error.code, error.message);
            }
            else if(error.code === 'auth/wrong-password')
            {
                console.log("잘못된 패스워드입니다");
            }
            else
            {
            }
        });
    }
    render() {
        return(
            <div>
                <LoginForm onSubmit={this.handleSubmit} initialValues={{submitting: this.state.submitting}}/>
            </div>
        );
    }
}
export default withRouter(Login);
