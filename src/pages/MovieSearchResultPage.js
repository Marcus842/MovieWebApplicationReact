
export default function MovieSearchResultPage({ movieElements }) {


    return (
        <>{movieElements ? (<div>
            <div className='moviesearchresultpage-content '>
                {movieElements}
            </div>
        </div>) : null}
        </>);
}


