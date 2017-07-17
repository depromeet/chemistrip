import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
};
class ProfileInputPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                나라/도시 선택
            </div>
        );
    }
}
ProfileInputPage.propTypes = propTypes;

export default ProfileInputPage;
