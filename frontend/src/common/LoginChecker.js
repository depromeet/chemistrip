import React, { Component, PropTypes } from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

// 로그인 되어 있는지 check 및 redirecting 사용 시 이 Component를 쓰면 된다.
const propTypes = {
};
const defaultProps = {
    redirectUrlOnCompletion: "/"
};

class LoginChecker extends Component {
    redirectToUrl = () => {
        alert("로그인이 필요합니다.");
        
        return "/";
    }
    render() {
        return(
            <div>
            {!this.props.loggedIn && <Redirect to={this.redirectToUrl()}/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn : state.login.loggedIn
    }
};

LoginChecker.propTypes = propTypes;
LoginChecker.defaultProps = defaultProps;

export default withRouter(connect(mapStateToProps)(LoginChecker));
