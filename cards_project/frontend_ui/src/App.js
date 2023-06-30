import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './static/scss/base.scss';
import './static/scss/common.scss';
import './static/scss/projects-orders.scss';
import './static/scss/modal-windows.scss'
import './static/scss/file-upload-form.scss'

import Sidenav from './components/UI/Navigation/Sidenav';
import Topnav from './components/UI/Navigation/Topnav';
import AppRouter from './components/Routers/AppRouter';

// Url для загрузки страниц
    export let checkUrl;
        if (window.location.href.includes('localhost:3000')) {
            checkUrl = 'http://localhost:3000';
        } else if (window.location.href.includes('127.0.0.1:8000')) {
            checkUrl = 'http://127.0.0.1:8000';
        } else {
        // Обработка случая, когда используется другой URL
        };

// URL с данными JSON
    export let API_Url;
        API_Url = 'http://127.0.0.1:8000'


function App() {

    const [activeLink, setActiveLink] = useState('');

return (
  <Router>
    <div className="wrapper">
        <div className="container">
            <div className="content">
                <Sidenav activeLink={activeLink} setActiveLink={setActiveLink} />
                <div className="main">
                    <Topnav activeLink={activeLink}/>
                    <div className="main-body">
                        <AppRouter/>
                    </div>
                </div>
            </div>    
        </div>
    </div>
  </Router>
  );
}

export default App;
