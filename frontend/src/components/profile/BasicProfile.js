import React from 'react';
import {TextField,SelectField,MenuItem} from 'material-ui';
import {Button, Container} from 'semantic-ui-react';

import LoginChecker from '../../common/LoginChecker';
import {FlatButton} from 'material-ui';

const mappingToMenuItems = (datas) => {
    return datas.map( (countryName, i) => {
        return (<MenuItem value={i+1} primaryText={countryName}/>);
    })
}
const itemsFromNumber = (min, max) => {
    let result = [];

    for(var i=min;i<=max;i++)
        result.push(<MenuItem value={i} primaryText={i.toString()}/>);

    return result;
}
const floatingStyle={
    fontSize:'12px',
    color: '#bdbdbd'
}
const flatButtonByValue = (value, text, genderSelectedValue, handleGender) => {
    return (<FlatButton
        onClick={() => { handleGender(value); }}
        style={{
            width: '49%',
            height: '56px',
            border: 'solid 1px #ced4da',
            backgroundColor: (genderSelectedValue == value) ? "#2be3c7" : "#f8f9fa",
            color: (genderSelectedValue == value) ? "#ffffff" : "#000000"
        }}
    >{text}</FlatButton>)
}

const BasicProfile = (props) => (
    <div>
        <Container text>
            <TextField
                hintText="이름을 입력하세요"
                floatingLabelText="이름"
                floatingLabelFixed={true}
                style={{width:'100%'}}
                onChange={props.handleNameChange}
                /><br/>
            <SelectField
                floatingLabelText="국적"
                value={props.value}
                onChange={props.handleChange}
                style={{width:'100%'}}
                >
                {
                    mappingToMenuItems(props.countryNames)
                }
            </SelectField><br/>
            <b style={floatingStyle}>생년월일</b><br/>
            <div>
                <SelectField
                    floatingLabelText="년도"
                    value={props.yearValue}
                    onChange={props.handleYearChange}
                    style={{width: '40%'}}
                    >
                    {itemsFromNumber(1950,2017)}
                </SelectField>
                <SelectField
                    floatingLabelText="월"
                    value={props.monthValue}
                    onChange={props.handleMonthChange}
                    style={{width: '30%'}}
                    >
                    {itemsFromNumber(1,12)}
                </SelectField>
                <SelectField
                    floatingLabelText="일"
                    value={props.dayValue}
                    onChange={props.handleDayChange}
                    style={{width: '30%'}}
                    >
                    {itemsFromNumber(1,31)}
                </SelectField>
            </div>
            <b style={floatingStyle}>성별</b><br/>
            {flatButtonByValue(0, "남", props.genderSelectedValue, props.handleGender)}
            {flatButtonByValue(1, "여", props.genderSelectedValue, props.handleGender)}
        </Container>
    </div>
);

export default BasicProfile;
