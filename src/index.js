import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import GotService from './services/gotService';

const char = new GotService();

console.log(char.getHouse(3));


ReactDOM.render(<App />, document.getElementById('root'));