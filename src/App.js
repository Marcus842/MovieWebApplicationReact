import './style.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MovieSearchResultPage from './pages/MovieSearchResultPage';

function App() {
  const [movieElements, setMovieElements] = useState(null);

  return (
    <Router>
      <Header setMovieElements={setMovieElements} />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/moviesearch" element={<MovieSearchResultPage movieElements={movieElements} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
