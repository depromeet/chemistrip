import React, {Component} from 'react';
import MatchingItemList from '../../components/matching/MatchingItemList';
import {Container} from 'semantic-ui-react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {withRouter} from 'react-router-dom';

import axios from 'axios';
import {DEFAULT_REQUEST_URL} from '../../constants';

class MatchingResultPage extends Component {
    state = {
        datas:  [
    		{
    			name: "David",
    			minDate: "2017/07/01",
    			maxDate: "2017/07/05",
    			matchingPercent: 70,
    			age: 25,
    			gender:"male",
    			profileSrc: "/media/David.png",
    		},
    		{
    			name: "Jang",
    			minDate: "2017/07/01",
    			maxDate: "2017/07/05",
    			matchingPercent: 50,
    			age: 30,
    			gender:"female",
    			profileSrc: "/media/Jang.png",
    		}
	    ]
    }
    submitData = async () => {
        await Promise.all([axios.get(DEFAULT_REQUEST_URL + '/matching-list?firebaseToken='+localStorage.getItem('chemistrip_token'))
                .then(response => {
                    console.log(response.data);
                    this.setState({ datas: response.data.datas });
                })
                .catch(error => {
                    console.log(error);
                })
            ]);
    }
    componentWillMount(){
        this.submitData();
    }
    render() {
        return(
            <Container text>
                <AppBar
                    title={<span>중국 상하이</span>}
                    iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                    />
                <MatchingItemList
                    datas={this.state.datas}
                    itemClickCallback={(id) => this.props.history.push('/profile-detail?id='+id)}
                    />
            </Container>
        );
    }
}
export default withRouter(MatchingResultPage);
