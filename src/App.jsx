import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import AddBlog from './AddBlog';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AddBlog" element={<AddBlog />} />
      </Routes>
    </Router>
  );
}

export default App;
