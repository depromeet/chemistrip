import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {BasicProfile, PreferenceProfile} from '../../components/profile';
import axios from 'axios';

import {DEFAULT_REQUEST_URL} from '../../constants';
import {withRouter} from 'react-router-dom';

import {FlatButton} from 'material-ui';

const propTypes = {
};
class ProfileInputPage extends Component {
    state = {
        pageNum: 1,
        genderSelectedValue: 0,
        value: 1,
        yearValue: null,
        monthValue: null,
        dayValue: null,
        countryNames: ["한국", "중국", "일본", "미국"],
        nameValue: "",
        memberCount: 1,
        preferGenderSelectedValue: 0,
        destination: "",
        minDate: '',
        maxDate: '',
        minAge: '25',
        maxAge: '30',
    }
    handleMinDateChange = (event, minDate) => this.setState({ minDate });
    handleMaxDateChange = (event, maxDate) => this.setState({ maxDate });
    handleMemberCountChange = (event, index, memberCount) => this.setState({memberCount});

    handleNameChange = (e, nameValue) => this.setState({nameValue});
    handleChange = (event, index, value) => this.setState({value});
    handleYearChange = (event, index, yearValue) => this.setState({yearValue});
    handleMonthChange = (event, index, monthValue) => this.setState({monthValue});
    handleDayChange = (event, index, dayValue) => this.setState({dayValue});

    handleGender = (value) => this.setState({genderSelectedValue: value});
    handlePreferGender = (value) => this.setState({preferGenderSelectedValue: value});

    onSubmit = async () => {
        if(this.state.pageNum === 1)
        {
            this.setState({
                pageNum: 2
            });
            return;
        }

        const s = this.state;

        const sendValues = {
            gender: (s.genderSelectedValue === 0) ? "male" : "female",
            birthDate: s.yearValue + "-" + s.monthValue + "-" + s.dayValue,
            countryName: s.countryNames[s.value-1],
            name: s.nameValue,
            destination: s.destination,
            minDate: s.minDate,
            maxDate: s.maxDate,
            minAge: s.minAge,
            maxAge: s.maxAge,
            preferenceGender: (s.preferGenderSelectedValue === 0) ? 'male' : 'female',
            memberCount: s.memberCount,
            firebaseToken: localStorage.getItem('chemistrip_token')
        };
        const history = this.props.history;

        await Promise.all([axios.post(DEFAULT_REQUEST_URL + '/profile-input/',sendValues)
                .then(response => {
                    console.log(response.data);
                    history.push("/qna");
                })
                .catch(error => {
                    console.log(error);
                    history.push("/qna");
                })
            ]);
    }
    render() {
        return(
            <div>
                {
                    (this.state.pageNum === 1) ?
                    <BasicProfile
                        handleNameChange={this.handleNameChange}
                        handleChange={this.handleChange}
                        handleYearChange={this.handleYearChange}
                        handleMonthChange={this.handleMonthChange}
                        handleDayChange={this.handleDayChange}
                        handleGender={this.handleGender}
                        {...this.state}
                        />
                    :
                    <PreferenceProfile
                        handleMinDateChange={this.handleMinDateChange}
                        handleMaxDateChange={this.handleMaxDateChange}
                        handleMemberCountChange={this.handleMemberCountChange}
                        handlePreferGender={this.handlePreferGender}
                        {...this.state}
                        />
                }
                <FlatButton
                    style={{
                        marginTop: '173px',
                        backgroundImage: 'linear-gradient(101deg, #2be3c7, #2ab8f5)',
                        color: '#ffffff',
                        height: '68px',
                    }}
                    labelStyle={{fontSize: '18px'}}
                    fullWidth={true}
                    label={ (this.state.pageNum === 1) ? "작성 완료" : "동행 찾기" }
                    onTouchTap={this.onSubmit}/>
            </div>
        );
    }
}
ProfileInputPage.propTypes = propTypes;

export default withRouter(ProfileInputPage);
