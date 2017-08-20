import React, { Component } from 'react';
import {ProfileDetail} from '../../components/profile';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {DEFAULT_REQUEST_URL} from '../../constants';

class ProfileDetailPage extends Component {
    state = {
        datas: {
            name: "김뚜쀼",
            country: "대한민국",
            age: 25,
            gender: "male",
        },
        scheduleDatas: [
            {
                country: "Paris",
                schedule: "2017.09.20 Wed - 2017.09.28 Fri"
            },
            {
                country: "Amsterdam",
                schedule: "2017.09.20 Wed - 2017.09.28 Fri"
            },
            {
                country: "Belgium",
                schedule: "2017.09.20 Wed - 2017.09.28 Fri"
            }
        ],
        preferenceDatas: {
            likeTrip: [
                "레져스포츠", "크러빙", "하이킹", "등등"
            ],
            dislikeTrip: [
                "레져스포츠", "크러빙", "하이킹", "등등"
            ],
        }
    }
    submitData = async () => {
        await Promise.all([axios.get(DEFAULT_REQUEST_URL + '/profile-detail?firebaseToken='
        +localStorage.getItem('chemistrip_token')+'&id='+this.props.match.params.id)
                .then(response => {
                    console.log(response.data);
                    this.setState({
                        datas: response.data.datas,
                        scheduleDatas: response.data.scheduleDatas,
                        preferenceDatas: response.data.preferenceDatas
                    });
                })
                .catch(error => {
                    console.log(error);
                })
            ]);
    }
    componentWillMount(){
        this.submitData();
    }
    closeCallback = () => {
        this.props.history.push('/matching-result');
    }
    render() {
        return(
            <ProfileDetail
                preferenceDatas={this.state.preferenceDatas}
                scheduleDatas={this.state.scheduleDatas}
                closeCallback={this.closeCallback}
                {...this.state.datas}
            />
        );
    }
}
export default withRouter(ProfileDetailPage);
