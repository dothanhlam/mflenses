import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from 'views/app';
import Home from 'views/home';
import About from 'views/about';
import NotFound from 'views/404';

const publicPath = '/';

export const routeCodes = {
  HOME: publicPath,
  ABOUT: `${ publicPath }about`,
};

export default class Routes extends Component {
  render() {
    return (
      <Router history={ browserHistory }>
        <Route path={ publicPath } component={ App }>
          <IndexRoute component={ Home } />
          <Route path={ routeCodes.ABOUT } component={ About } />
          <Route path='*' component={ NotFound } />
        </Route>
      </Router>
    );
  }
}
