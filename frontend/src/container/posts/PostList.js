import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Grid, Row, Col, Nav, NavItem} from 'react-bootstrap';
import {PostCard} from '../../components/posts';

const propTypes = {
};
class PostList extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        selectedKey: 1
    }
    handleSelect = (selectedKey) => {
        this.setState({
            selectedKey: selectedKey
        })
    }
    componentWillMount(){
        //this.props.fetchDatas();
    }
    render() {
        const mappingToPostCard = (datas) => {
            return datas.map((data, i) => {
                return (
                    <Col xs={6} md={4}>
                        <PostCard
                            imageSrc={data.imageSrc}
                            title={data.title}
                            region={data.region}
                            />
                    </Col>);
            });
        }
        return(
            <div>
                <Nav bsStyle="tabs" justified
                    activeKey={this.state.selectedKey}
                    onSelect={this.handleSelect}>
                    <NavItem eventKey={1}>머뭄</NavItem>
                    <NavItem eventKey={2}>해봄</NavItem>
                    <NavItem eventKey={3}>이야기</NavItem>
                </Nav>
                <Grid style={{marginTop: '50px'}}>
                    <Row>
                        {mappingToPostCard(this.props.datas[this.state.selectedKey-1])}
                    </Row>
                </Grid>
            </div>
        );
    }
}
PostList.propTypes = propTypes;

export default PostList;
