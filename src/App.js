import './style.css';
import React, { useState } from 'react';
import Movie from './Movie';

function App() {
  const [movieElements, setMovieElements] = useState(null);
  const [title, setTitle] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [searchResultsNumber, setSearchResultsNumber] = useState(null);
  const [displayPrevButton, SetDisplayPrevButton] = useState(false);
  const [displayNextButton, SetDisplayNextButton] = useState(false);
  const apiKey = process.env.REACT_APP_API_KEY;

  async function handleClick(event) {
    event.preventDefault();

    let queryPageIndex;
    if (event.target.id === "next") {
      queryPageIndex = pageIndex + 1;
      setPageIndex(queryPageIndex);
    }
    else if (event.target.id === "previous") {
      queryPageIndex = pageIndex - 1;
      setPageIndex(queryPageIndex);
    }
    else {
      queryPageIndex = pageIndex;
    }

    let totalResults;
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${title}&page=${queryPageIndex}`);
      const resData = await res.json();
      if (!res.ok) {
        console.error(`Error status: ${res.status}`);
      }
      else if (resData.Response === "False") {
        console.error(`Error message: ${resData.Error}`);
      }
      else {
        totalResults = resData.totalResults;
        setSearchResultsNumber(totalResults);
        const movies = resData.Search.map(movie =>
          <Movie img={movie.Poster} key={movie.imdbID} title={movie.Title} year={movie.Year} type={movie.Type}></Movie>
        );
        setMovieElements(movies);
      }
    }
    catch (error) {
      console.error(error);
    }
    if (queryPageIndex > 1) {
      SetDisplayPrevButton(true);
    }
    else {
      SetDisplayPrevButton(false);
    }
    if (totalResults) {
      var totalResultsInt = parseInt(totalResults);
      var numberOfPages = totalResultsInt / 10;
      var numberOfPagesInt = Math.ceil(numberOfPages);
      if (queryPageIndex < numberOfPagesInt) {
        SetDisplayNextButton(true);
      }
      else {
        SetDisplayNextButton(false);
      }
    }
    else {
      SetDisplayNextButton(false);
    }
  }

  function handleChange(e) {
    const val = e.target.value
    setTitle(val)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome</h1>
        <form onSubmit={handleClick}>
          <input type='text' placeholder='Movie title' name="title" value={title} onChange={handleChange}></input>
          <input type='submit' placeholder='Submit' value='Submit'></input>
        </form>
        <div>
          {displayPrevButton ?
            (<div className='pagination-div-class'>
              <form onSubmit={handleClick} id="previous" name='previous'>
                <input type='submit' placeholder='Previous' value='Previous'></input>
              </form>
            </div>) :
            null}
          {displayNextButton ?
            (<div className='pagination-div-class'>
              <form onSubmit={handleClick} id="next" name='next'>
                <input type='submit' placeholder='Next' value='Next'></input>
              </form>
            </div>) :
            null}
        </div>
        {searchResultsNumber ? (<p ><b>Number of search results: </b>{searchResultsNumber}</p>) : null}
      </header>

      <div className='App-content'>
        {movieElements}
      </div>
    </div>
  );
}

export default App;
