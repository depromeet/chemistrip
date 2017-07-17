import React, { Component, PropTypes } from 'react';
const propTypes = {
};
const defaultProps = {
};

class PostIntro extends Component {
    render() {
        const data = this.props;
        return(
            <div>
                <div style={{textAlign: "center"}}>
                    <h3>{data.title}</h3>
                    <p>주소: {data.address}</p>
                    <h3>소개</h3>
                    <p>
                        {data.intro}
                    </p>
                    <h3>머뭄</h3>
                    <p>
                        객실 수 : {data.room_count} <br />
                        인원 : {data.min_person}~{data.max_person}인 <br/>
                            
                    </p>
                </div>
            </div>
        );
    }
}
PostIntro.propTypes = propTypes;
PostIntro.defaultProps = defaultProps;
export default PostIntro;
