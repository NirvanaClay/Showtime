import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import React from 'react';
import ReactDOM from 'react-dom';

import Home from './Home';
import RegisterForm from './components/RegisterForm.js';

const Routing = () => {
  return(
    <Router basename={"/build"}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  )
}

export default Routing;