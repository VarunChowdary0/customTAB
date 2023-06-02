import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Top_1 from './components/Top_1';
import Time from './components/Line_2';
import MyApps from './components/AppBox';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Top_1 />
    <Time />
    <MyApps/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
