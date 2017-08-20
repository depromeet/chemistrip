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

const floatingStyle={
    marginTop: '50px',
    fontSize:'15px',
}
const flatButtonByValue = (value, text, preferGenderSelectedValue, handlePreferGender) => (
    <FlatButton
        onClick={() => { handlePreferGender(value); }}
        style={{
            width: '49%',
            height: '56px',
            border: 'solid 1px #ced4da',
            backgroundColor: (preferGenderSelectedValue == value) ? "#2be3c7" : "#f8f9fa",
            color: (preferGenderSelectedValue == value) ? "#ffffff" : "#000000"
        }}
    >{text}</FlatButton>
);

const itemsFromNumber = (min, max) => {
    let result = [];

    for(var i=min;i<=max;i++)
        result.push(<MenuItem value={i} primaryText={i.toString()}/>);

    return result;
}

const PreferenceProfile = (props) => (
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
                onChange={props.handleMinDateChange}
                autoOk={true}
                floatingLabelText="시작 날짜"
                defaultDate={new Date()}
                disableYearSelection={true}
                />
            <DatePicker
                onChange={props.handleMaxDateChange}
                autoOk={true}
                floatingLabelText="종료 날짜"
                defaultDate={new Date()}
                disableYearSelection={true}
                />
            <p style={floatingStyle}><b>연령대 선택</b></p>
            <Range min={20} max={50} defaultValue={[25, 35]} tipFormatter={value => `${value}`} />

            <p style={floatingStyle}><b>성별 선택</b></p>
            {flatButtonByValue(0, "남자",props.preferGenderSelectedValue, props.handlePreferGender)}
            {flatButtonByValue(1, "여자",props.preferGenderSelectedValue, props.handlePreferGender)}
            {flatButtonByValue(2, "무관",props.preferGenderSelectedValue, props.handlePreferGender)}

            <p style={floatingStyle}><b>인원 선택</b></p>
            <SelectField
                value={props.memberCount}
                onChange={props.handleMemberCountChange}
                style={{width: '100%'}}
                >
                {itemsFromNumber(1,4)}
            </SelectField>
        </Container>
    </div>
)

export default PreferenceProfile;
