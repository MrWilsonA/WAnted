import type { CSSProperties } from "react";
import { poster } from "../features/board/layout";

export default function WantedPoster() {
    const style = { left: `${poster.x}%`, top: `${poster.y}%` } as CSSProperties;

    return (
        <article className="poster" style={style} aria-label="Wanted poster of Wilson Arlando">
            <span className="pin" aria-hidden="true" />
            <h1 className="poster__title">WANTED</h1>
            <div className="poster__photo" />
            <p className="poster__name">Wilson Arlando</p>
        </article>
    );
}
