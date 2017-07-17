import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

class CenteredComponent extends Component {
    render() {
        return(
            <Grid>
                <Row>
                    <Col md={6} mdOffset={3}>
                        {this.props.children}
                    </Col>
                </Row>
            </Grid>
        );
    }
}
export default CenteredComponent;
