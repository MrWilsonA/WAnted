import photo from "../assets/Wilson.jpg";
import { place, poster } from "../features/board/layout";

export default function WantedPoster() {
    return (
        <article className="paper poster" style={place(poster)} aria-label="Wanted poster of Wilson Arlando">
            <h1 className="poster__title">WANTED</h1>
            <img className="poster__photo" src={photo} alt="Wilson Arlando" />
            <p className="poster__name">Wilson Arlando</p>
            <p className="poster__reward">Laboratory Assistant · Case 27-1</p>
        </article>
    );
}
