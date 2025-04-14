
export default function MovieSearchResultPage({ movieElements }) {


    return (
        <>{movieElements ? (<div>
            <div className='app-content'>
                {movieElements}
            </div>
        </div>) : null}
        </>);
}


