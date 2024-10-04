export default function Movie(props) {
    const imageText = props.title + " image text";
    return (
        <div>
            {props.img && props.img !== "N/A" ? (<img className="poster-image" src={props.img} alt={imageText} />) : null}
            <ul className="image-spec-ul">
                <li><b>Title: </b>{props.title}</li>
                <li><b>Year: </b>{props.year}</li>
                <li><b>Type: </b>{props.type}</li>
            </ul>
        </div>);
}