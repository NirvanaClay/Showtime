import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Switch, BrowserRouter } from 'react-router-dom'

import './index.css';
import App from './app';

import RegisterForm from './components/RegisterForm';
import reportWebVitals from './reportWebVitals';

// if (document.getElementById('root')) {
//   console.log('Shitballs');
//   ReactDOM.render(<App />, document.getElementById('root'));
// }

ReactDOM.render(
  <React.StrictMode>
    {/* <Routing /> */}
    {/* <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='register' element={<RegisterForm />} />
      </Routes>
    </BrowserRouter> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
