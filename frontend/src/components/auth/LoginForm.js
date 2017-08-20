import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {TextField, Checkbox, SelectField, MenuItem, FlatButton} from 'material-ui'
import { Container, Icon, Button} from 'semantic-ui-react'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values/*, dispatch */) => {
  return sleep(1000) // simulate server latency
    .then(() => {
      if ([ 'foo@foo.com', 'bar@bar.com' ].includes(values.email)) {
        throw { email: '이미 존재하는 이메일 입니다.' }
      }
    })
}

const validate = values => {
  const errors = {}
  const requiredFields = [ 'email', 'password' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = '입력 값이 없습니다.'
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = '유효한 이메일 주소가 아닙니다.'
  }

  if(values.password && values.password.length < 6 )
    errors.password = '비밀번호는 최소 6자 이상이어야 합니다.'

  return errors
}

const renderTextField = ({ input, type, label, meta: { touched, error }, ...custom }) => (
    <div>
        <div style={{width: '100%', display: 'inline-block'}}>
            <TextField
                hintText={label}
                hintStyle={{ color: '#ffffff'}}
                inputStyle={{ color: '#ffffff'}}
                errorText={touched && error}
                fullWidth={true}
                type={type}
                underlineFocusStyle={{borderColor: '#2be3c7'}}
                {...input}
                {...custom}
            />
        </div>
    </div>
)

const LoginForm = props => {
    const btStyle = {
        width: '48%',
        height: '56px',
        borderRadius: '4px',
        border: 'solid 1px rgba(255, 255, 255, 0.6)',
        color: '#ffffff',
    }
    const { handleSubmit, pristine, reset, initialValues } = props
    return (
        <form onSubmit={handleSubmit}>
            <div style={{
                    backgroundImage: 'linear-gradient(151deg, #2be3c7, #2ab8f5)',
                }}>
                <Container text>
                    <Container textAlign="center" style={{color: '#ffffff', marginTop: '130px', marginBottom: '80px'}}>케미스트립</Container>
                        <div>
                            <Field name="email" component={renderTextField} label="Username"/>
                            <Field name="password" component={renderTextField} label="password" type="password"/>
                        </div>
                        <div style={{marginTop: '25px'}}>
                            <Button style={{...btStyle, width:'100%', backgroundColor: 'rgba(242, 245, 247, 0.2)'}}
                                type="submit" loading={initialValues.submitting} disabled={initialValues.submitting}>케미스트립 계정으로 시작하기</Button>
                        </div>
                        <Container style={{color: '#ffffff', fontSize: '12px'}} textAlign="center">or</Container>
                        <Container textAlign="center" style={{marginTop: '10px', marginBottom: '400px'}}>
                            <FlatButton style={btStyle} hoverColor="#2be3c7">google</FlatButton>&nbsp;
                            <FlatButton style={btStyle} hoverColor="#2be3c7">facebook</FlatButton>
                        </Container>
                </Container>
            </div>
        </form>
    )
}

export default reduxForm({
  form: 'login',  // a unique identifier for this form
  validate,
  asyncValidate
})(LoginForm)
