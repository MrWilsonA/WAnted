import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { createTimeline } from "animejs";
import { getCaseFile } from "../../api/caseFiles";
import photo from "../../assets/Wilson.jpg";
import type { CaseFile, CaseFileSummary } from "../../types/caseFile";

interface Props {
    files: CaseFileSummary[];
    index: number;
    onGo: (index: number) => void;
    onClose: () => void;
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function CaseDesk({ files, index, onGo, onClose }: Props) {
    const summary = files[index];
    const [file, setFile] = useState<CaseFile | null>(null);
    const current = file?.slug === summary.slug ? file : null;

    useEffect(() => {
        getCaseFile(summary.slug)
            .then(setFile)
            .catch((err: Error) =>
                setFile({ ...summary, id: 0, updatedAt: "", body: `> Failed to retrieve this file: ${err.message}` }),
            );
    }, [summary]);

    useEffect(() => {
        const tl = createTimeline()
            .add(".desk", { opacity: [0, 1], duration: 400, ease: "outQuad" })
            .add(".polaroid", { opacity: [0, 1], x: [-200, 0], rotate: [-35, -8], duration: 1000, ease: "outExpo" }, 150);
        return () => {
            tl.revert();
        };
    }, []);

    useEffect(() => {
        const tl = createTimeline({ defaults: { ease: "outExpo" } })
            .add(".sheet", { opacity: [0, 1], y: [140, 0], rotate: [-5, -0.6], duration: 800 })
            .add(".stamp", { opacity: [0, 0.9], scale: [3, 1], ease: "inQuad", duration: 300 }, "-=400")
            .add(".sheet", { x: [{ to: -6 }, { to: 5 }, { to: -2 }, { to: 0 }], ease: "linear", duration: 280 });
        return () => {
            tl.revert();
        };
    }, [summary.slug]);

    return (
        <div
            className="desk"
            role="dialog"
            aria-modal="true"
            aria-label={summary.title}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <figure className="polaroid">
                <img src={photo} alt="Wilson Arlando" />
                <figcaption>Suspect #01</figcaption>
            </figure>
            <article className="sheet" key={summary.slug}>
                <span className="stamp">Confidential</span>
                <header className="sheet__head">Case file {summary.code} · Wilson Arlando</header>
                <h2 className="sheet__title">{summary.title}</h2>
                <p className="sheet__summary">{summary.summary}</p>
                <div className="sheet__body">
                    {current ? <Markdown>{current.body}</Markdown> : <p>Retrieving evidence…</p>}
                </div>
            </article>
            <nav className="desk__nav">
                <button type="button" disabled={index === 0} onClick={() => onGo(index - 1)}>
                    ← Prev
                </button>
                <span>
                    {pad(index + 1)} / {pad(files.length)}
                </span>
                <button type="button" disabled={index === files.length - 1} onClick={() => onGo(index + 1)}>
                    Next →
                </button>
                <button type="button" onClick={onClose}>
                    Board · Esc
                </button>
            </nav>
        </div>
    );
}
