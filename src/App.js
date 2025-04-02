import './style.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MovieSearchPage from './pages/MovieSearchPage';

function App() {
  return (
    <Router>
    <div className="app">
      <Header/>
      <main className="container">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/moviesearch" element={<MovieSearchPage />} />
                    </Routes>
            </main>
    </div>
    </Router>
  );
}

export default App;
