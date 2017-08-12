import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {TextField,SelectField,MenuItem} from 'material-ui';
import {Button, Container} from 'semantic-ui-react';
import CenteredComponent from '../../common/CenteredComponent';
import {FlatButton} from 'material-ui';

const propTypes = {
};
class BasicProfilePage extends Component {
    state = {
        genderSelectedValue: 0,
        value: 1,
        yearValue: null,
        monthValue: null,
        dayValue: null,
        countryNames: ["한국", "중국", "일본", "미국"],
    };

    handleChange = (event, index, value) => this.setState({value});
    handleYearChange = (event, index, yearValue) => this.setState({yearValue});
    handleMonthChange = (event, index, monthValue) => this.setState({monthValue});
    handleDayChange = (event, index, dayValue) => this.setState({dayValue});

    render() {
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
        const flatButtonByValue = (value, text) => {
            return (<FlatButton
                onClick={() => this.setState({genderSelectedValue: value})}
                style={{
                    width: '49%',
                    height: '56px',
                    border: 'solid 1px #ced4da',
                    backgroundColor: (this.state.genderSelectedValue == value) ? "#2be3c7" : "#f8f9fa",
                    color: (this.state.genderSelectedValue == value) ? "#ffffff" : "#000000"
                }}
            >{text}</FlatButton>)
        }
        return(
            <div>
                <Container text>
                    <TextField
                        hintText="이름을 입력하세요"
                        floatingLabelText="이름"
                        floatingLabelFixed={true}
                        style={{width:'100%'}}
                        /><br/>
                    <SelectField
                        floatingLabelText="국적"
                        value={this.state.value}
                        onChange={this.handleChange}
                        style={{width:'100%'}}
                        >
                        {
                            mappingToMenuItems(this.state.countryNames)
                        }
                    </SelectField><br/>
                    <b style={floatingStyle}>생년월일</b><br/>
                    <div>
                        <SelectField
                            floatingLabelText="년도"
                            value={this.state.yearValue}
                            onChange={this.handleYearChange}
                            style={{width: '40%'}}
                            >
                            {itemsFromNumber(1950,2017)}
                        </SelectField>
                        <SelectField
                            floatingLabelText="월"
                            value={this.state.monthValue}
                            onChange={this.handleMonthChange}
                            style={{width: '30%'}}
                            >
                            {itemsFromNumber(1,12)}
                        </SelectField>
                        <SelectField
                            floatingLabelText="일"
                            value={this.state.dayValue}
                            onChange={this.handleDayChange}
                            style={{width: '30%'}}
                            >
                            {itemsFromNumber(1,31)}
                        </SelectField>
                    </div>
                    <b style={floatingStyle}>성별</b><br/>
                    {flatButtonByValue(0, "남")}
                    {flatButtonByValue(1, "여")}
                </Container>
                <FlatButton
                    style={{
                        marginTop: '173px',
                        backgroundImage: 'linear-gradient(101deg, #2be3c7, #2ab8f5)',
                        color: '#ffffff',
                        height: '68px',
                    }}
                    labelStyle={{fontSize: '18px'}}
                    fullWidth={true}
                    label="작성 완료" />
            </div>
        );
    }
}
BasicProfilePage.propTypes = propTypes;

export default BasicProfilePage;
