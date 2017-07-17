import React from 'react';
import {Navbar, MenuItem, NavItem, NavDropdown, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Search} from 'semantic-ui-react';

const NavigationBar = () => (
    <Navbar fixedTop collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
                <LinkContainer to='/'>
                    <a>트렌즈</a>
                </LinkContainer>
            </Navbar.Brand>
            <Search
                style={{display: 'inline-block', marginTop: '6px', marginLeft: '30px'}}
                placeholder="지역, 머뭄명, 제목으로 검색해주세요"
                fluid
            />

            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav pullRight>
                <LinkContainer to='/login'>
                    <NavItem eventKey={1}>로그인</NavItem>
                </LinkContainer>
                <LinkContainer to='/signup'>
                    <NavItem eventKey={2} href="#">회원가입</NavItem>
                </LinkContainer>

                <NavDropdown eventKey={3} title="커뮤니티" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>공지사항</MenuItem>
                    <MenuItem eventKey={3.2}>회사 소개</MenuItem>
                    <MenuItem eventKey={3.3}>서비스 소개</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.4}>개인정보 취급방침</MenuItem>
                    <MenuItem eventKey={3.5}>FAQ</MenuItem>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)

export default NavigationBar;
