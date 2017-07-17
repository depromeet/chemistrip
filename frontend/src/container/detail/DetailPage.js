import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {ButtonGroup, Button} from 'react-bootstrap';
import {CarouselDetail} from '../../components/detail';
import CenteredComponent from '../../common/CenteredComponent';
import {Route} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import LocationPage from './LocationPage';

const propTypes = {
};
class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: 1,
            carouselDatas: [
                {
                    imageSrc: "/test",
                    title: "예시 사진1",
                    description: "예시 설명 1"
                },
                {
                    imageSrc: "/test",
                    title: "예시 사진2",
                    description: "예시 설명 2"
                },
                {
                    imageSrc: "/test",
                    title: "예시 사진3",
                    description: "예시 설명 3"
                }
            ],
        }
    }
    handleSelect = (selectedKey) => {
        this.setState({
            selectedKey: selectedKey
        })
    }
    render() {
        const subUrl = "/detail/"+this.props.match.params.id;

        return(
            <CenteredComponent>
                <CarouselDetail datas={this.state.carouselDatas} />
                <h1>솔바람 펜션</h1>
                <ButtonGroup>
                    <Button onClick={() => this.handleSelect(1)}
                        active={(this.state.selectedKey === 1)}>
                        개요
                    </Button>
                    <Button onClick={() => this.handleSelect(2)}
                        active={(this.state.selectedKey === 2)}>
                        후기
                    </Button>
                    <Button onClick={() => this.handleSelect(3)}
                        active={(this.state.selectedKey === 3)}>
                        주인장
                    </Button>
                    <Button onClick={() => this.handleSelect(4)}
                        active={(this.state.selectedKey === 4)}>
                        마을 이야기
                    </Button>
                    <LinkContainer to={subUrl+"/location"}>
                        <Button onClick={() => this.handleSelect(5)}
                            active={(this.state.selectedKey === 5)}>
                            위치
                        </Button>
                    </LinkContainer>
                </ButtonGroup>
                <Route path= {subUrl+"/location"} component={LocationPage}/>
            </CenteredComponent>
        );
    }
}
DetailPage.propTypes = propTypes;
export default DetailPage;
