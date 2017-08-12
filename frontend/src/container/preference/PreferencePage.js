import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import {Icon, Container} from 'semantic-ui-react';

import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

import './geosuggest.css';
import Geosuggest from 'react-geosuggest';
import {FlatButton, DatePicker, SelectField,MenuItem} from 'material-ui';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const propTypes = {
};
class PreferencePage extends Component {
    state = {
        memberCount: 1,
        genderSelectedValue: 0,
    }
    handleChangeMinDate = (event, date) => {
        console.log(date);
    };
    handleChangeMaxDate = (event, date) => {
        console.log(date);
    };
    handleMemberCountChange = (event, index, memberCount) => this.setState({memberCount});

    render() {
        const floatingStyle={
            marginTop: '50px',
            fontSize:'15px',
        }
        const flatButtonByValue = (value, text) => {
            return (<FlatButton
                onClick={() => this.setState({genderSelectedValue: value})}
                style={{
                    width: '33%',
                    height: '56px',
                    border: 'solid 1px #ced4da',
                    backgroundColor: (this.state.genderSelectedValue == value) ? "#2be3c7" : "#f8f9fa",
                    color: (this.state.genderSelectedValue == value) ? "#ffffff" : "#000000"
                }}
            >{text}</FlatButton>)
        }
        const itemsFromNumber = (min, max) => {
            let result = [];

            for(var i=min;i<=max;i++)
                result.push(<MenuItem value={i} primaryText={i.toString()}/>);

            return result;
        }
        return(
            <div>
                <Container text>
                    <Toolbar style={{backgroundColor: '#ffffff'}}>
                        <ToolbarGroup firstChild={true}>
                            <ToolbarTitle text="David" />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <Icon name='setting'/>
                        </ToolbarGroup>
                    </Toolbar>
                    <p style={floatingStyle}><b>나라/도시 선택</b></p>
                    <Geosuggest
                        placeholder="Typing City"
                        style={{width: '100%'}}
                        country="kr"/>
                    <p style={floatingStyle}><b>일정 선택</b></p>
                    <DatePicker
                        onChange={this.handleChangeMinDate}
                        autoOk={true}
                        floatingLabelText="시작 날짜"
                        defaultDate={new Date()}
                        disableYearSelection={true}
                        />
                    <DatePicker
                        onChange={this.handleChangeMaxDate}
                        autoOk={true}
                        floatingLabelText="종료 날짜"
                        defaultDate={new Date()}
                        disableYearSelection={true}
                        />
                    <p style={floatingStyle}><b>연령대 선택</b></p>
                    <Range min={20} max={50} defaultValue={[25, 35]} tipFormatter={value => `${value}`} />

                    <p style={floatingStyle}><b>성별 선택</b></p>
                    {flatButtonByValue(0, "남자")}{flatButtonByValue(1, "여자")}{flatButtonByValue(2, "무관")}

                    <p style={floatingStyle}><b>인원 선택</b></p>
                    <SelectField
                        value={this.state.memberCount}
                        onChange={this.handleMemberCountChange}
                        style={{width: '100%'}}
                        >
                        {itemsFromNumber(1,4)}
                    </SelectField>
                </Container>
                <FlatButton
                    style={{
                        marginTop: '50px',
                        backgroundImage: 'linear-gradient(101deg, #2be3c7, #2ab8f5)',
                        color: '#ffffff',
                        height: '68px',
                    }}
                    labelStyle={{fontSize: '18px'}}
                    fullWidth={true}
                    label="동행 찾기" />
            </div>
        );
    }
}
PreferencePage.propTypes = propTypes;

export default PreferencePage;
