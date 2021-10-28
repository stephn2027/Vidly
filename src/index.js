import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import App from './components/App';
import logger from './services/logService'

logger.init();
console.log("Superman",process.env.REACT_APP_NAME);



ReactDOM.render(
    <BrowserRouter>
    <App />
    </BrowserRouter>,
    
    document.getElementById('root')
    );