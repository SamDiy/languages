import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { Provider } from 'react-redux';
import store from './store/index';

import { BrowserRouter as Router } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';

ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));