import React from 'react';
import App from './App';
import {NavigationBar, NotFound} from './components/tools';

import {Login, SignUp} from './container/auth';
import {ProfileInputPage} from './container/profile';
import {QNAPage} from './container/qna';
import MatchingResultPage from './container/matching/MatchingResultPage';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const route = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/profile-input" component={ProfileInputPage} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Route path="/qna" component={QNAPage} />
                <Route path="/matching-result" component={MatchingResultPage} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
)

export default route;
