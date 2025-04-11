import React, { useState } from 'react';
import { SearchForMovies } from '../services/OmdApiService';
import Header from '../components/Header'


export default function MovieSearchPage() {
    const [movieElements, setMovieElements] = useState(null);
    const [title, setTitle] = useState("");
    const [pageIndex, setPageIndex] = useState(1);
    const [searchResultsNumber, setSearchResultsNumber] = useState(null);
    const [displayPrevButton, SetDisplayPrevButton] = useState(false);
    const [displayNextButton, SetDisplayNextButton] = useState(false);

    function handleChange(e) {
        const val = e.target.value;
        setTitle(val);
    }

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

        let totalResults = await SearchForMovies(title, queryPageIndex, setSearchResultsNumber, setMovieElements);

        LogicForDisplayingPaginationButtons(queryPageIndex, totalResults);
    }

    function LogicForDisplayingPaginationButtons(queryPageIndex, totalResults) {
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

    return (
        <div>
            <div className="div-header">
                <Header />
            <div className='search-box'>
                <form onSubmit={handleClick}>
                    <p><input type='text' placeholder='Movie title' name="title" value={title} onChange={handleChange}></input></p>
                    <input type='submit' placeholder='Submit' value='Search'></input>
                </form>
                <div className='paginations-div-class'>
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
                {searchResultsNumber ? (<p><b>Number of search results: </b>{searchResultsNumber}</p>) : null}
            </div>
            </div>
            <div className='app-content'>
                {movieElements}
            </div>
        </div>);
}


