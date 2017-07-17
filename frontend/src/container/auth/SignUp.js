import React from "react";
import { connect } from "react-redux";
import { Field, SubmissionError, reduxForm } from "redux-form";
import { Checkbox, Form} from "react-bootstrap";
import FormField from "../../components/auth/common/FormField";
import FormSubmit from "../../components/auth/common/FormSubmit";
import CenteredComponent from '../../common/CenteredComponent';

export class SignUp extends React.Component {
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
                <h2 style={{marginBottom: '50px'}}>회원가입</h2>
                <Form>
                    <Field component={FormField} name="user_id" label="아이디" doValidate={true}/>
                    <Field type="password" component={FormField} name="password" label="비밀번호" doValidate={true}/>
                    <Field type="password" component={FormField} name="password_check" label="비밀번호 확인" doValidate={true}/>
                    <Field component={FormField} name="username" label="이름" doValidate={true}/>
                    <Field component={FormField} name="phone_number" label="연락처" doValidate={true}/>
                    <Field component={FormField} name="email" label="메일" doValidate={true}/>
                    <Checkbox>
                        개인정보 수집 및 이용 동의
                    </Checkbox>
                    <FormSubmit error={error} invalid={invalid} submitting={submitting} buttonSaveLoading="회원가입 중..."
                        buttonSave="회원가입"/>
                </Form>
                <div>
                    <h3>1. 개인정보의 처리 목적....</h3>
                </div>
            </CenteredComponent>
        );
    }

    // submit the form
    formSubmit(values) {
        const {dispatch} = this.props;
    }
}

export default reduxForm({
    form: 'signup',
    validate: function (values) {
        const errors = {};
        if(!values.user_id)
            errors.user_id = '이름을 입력하세요';
        if(!values.password)
            errors.password = '패스워드를 입력하세요';
        if(values.password !== values.password_check)
            errors.password_check = '패스워드가 일치하지 않습니다.';
        if(!values.username)
            errors.username = '이름을 입력하세요';
        if(!values.phone_number)
            errors.phone_number = '핸드폰 번호를 입력하세요';
        if(!values.email)
            errors.email = '메일을 입력하세요';


        return errors;
    },
})(SignUp);
