import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import { IntlActions } from 'react-redux-multilingual'

import App from 'views/app';
import Home from 'views/home';
import About from 'views/about';
import Lens from 'views/lens';
import NotFound from 'views/404';

const publicPath = '/';

export const routeCodes = {
    HOME: publicPath,
    ABOUT: 'about',
    LENS: 'lens',
    LENS_DETAIL: 'lens/:id',
};

export const getRoutes = (store)  => {
    const innerRoutes = (
        <Route>
            <IndexRoute component={ Home }/>
            <Route path={ routeCodes.ABOUT } component={ About }/>
            <Route path={ routeCodes.LENS } component={ Home }/>
            <Route path={ routeCodes.LENS_DETAIL } components={ Lens } />
            <Route path='*' component={ NotFound }/>
        </Route>
    );

    return (
        <Router history={ browserHistory }>
            <Route path={ publicPath } component={ App }>
                <Route path="en" onEnter={() => store.dispatch(IntlActions.setLocale('en'))}>
                    {innerRoutes}
                </Route>
                <Route path="zh" onEnter={() => store.dispatch(IntlActions.setLocale('zh'))}>
                    {innerRoutes}
                </Route>
                {innerRoutes}
            </Route>
        </Router>
    );
}
