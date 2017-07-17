import React from 'react';
import App from './App';
import {NavigationBar, NotFound} from './components/tools';

import {Login, SignUp} from './container/auth';
import {ProfileInputPage, BasicProfilePage} from './container/profile';
import {QNAPage} from './container/qna';
import {DateSelectionPage} from './container/schedule';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const marginForFixedNavbar = {
    marginBottom: '70px'
};

const route = (
    <Router>
        <div>
            <div style={marginForFixedNavbar}>
                <NavigationBar />
            </div>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/date-selection" component={DateSelectionPage} />
                <Route path="/profile-input" component={ProfileInputPage} />
                <Route path="/basic-profile" component={BasicProfilePage} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Route path="/qna" component={QNAPage} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
)

export default route;
