import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './containers/App';
import HomePage from './components/pages/HomePage';
import Test from './components/Test';
export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="/test" component={Test} />
    </Route>
);