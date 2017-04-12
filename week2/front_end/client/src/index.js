import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';

import { browserHistory, Router } from 'react-router';

ReactDOM.render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('root')
);