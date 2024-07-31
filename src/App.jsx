
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import AddBlog from './AddBlog';
import './App.css';
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const element = document.querySelector('webchatgpt');
    if (element) {
      element.remove();
    }
  }, []);
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
