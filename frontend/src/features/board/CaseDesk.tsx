import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { animate, createTimeline, stagger } from "animejs";
import { getCaseFile } from "../../api/caseFiles";
import pages from "../../assets/Pages.mp3";
import photo from "../../assets/Wilson.jpg";
import type { CaseFile, CaseFileSummary } from "../../types/caseFile";
import Statements from "./Statements";
import "./desk.css";

interface Props {
    files: CaseFileSummary[];
    index: number;
    onGo: (index: number) => void;
    onClose: () => void;
}

interface Scene {
    stamp: string;
    photo?: string;
    props: string[];
}

const scenes: Record<string, Scene> = {
    "1a": { stamp: "Identified", photo: "Suspect #01", props: ["cup"] },
    "1b": { stamp: "Evidence", props: ["magnifier", "pencil"] },
    "1c": { stamp: "Planned", props: ["pencil", "cup"] },
    "1d": { stamp: "New lead", props: ["magnifier"] },
    "1e": { stamp: "Cold case", props: ["cup", "pencil"] },
    "1f": { stamp: "Accepted", photo: "Case closed", props: ["pencil"] },
};

const pageSound = new Audio(pages);

const pad = (n: number) => String(n).padStart(2, "0");

const wiggle = (el: Element) =>
    animate(el, { rotate: [{ to: 8 }, { to: -5 }, { to: 0 }], duration: 500, ease: "outQuad" });

export default function CaseDesk({ files, index, onGo, onClose }: Props) {
    const summary = files[index];
    const scene = scenes[summary.code] ?? { stamp: "Confidential", props: [] };
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
        const fade = animate(".desk", { opacity: [0, 1], duration: 400, ease: "outQuad" });
        return () => {
            fade.revert();
        };
    }, []);

    useEffect(() => {
        pageSound.currentTime = 0;
        pageSound.play().catch(() => {});
        const tl = createTimeline({ defaults: { ease: "outExpo" } })
            .add(".dossier", { opacity: [0, 1], y: [140, 0], rotate: [-5, -0.6], duration: 800 })
            .add(
                ".prop",
                { opacity: [0, 1], scale: [1.4, 1], rotate: [-25, 0], duration: 900, delay: stagger(120) },
                150,
            )
            .add(".stamp", { opacity: [0, 0.9], scale: [3, 1], ease: "inQuad", duration: 300 }, 500)
            .add(".dossier", { x: [{ to: -6 }, { to: 5 }, { to: -2 }, { to: 0 }], ease: "linear", duration: 280 });
        const sweep = animate(".prop--magnifier", {
            x: [0, -40],
            y: [0, 30],
            duration: 2600,
            delay: 1200,
            ease: "inOutSine",
            loop: true,
            alternate: true,
        });
        return () => {
            tl.revert();
            sweep.revert();
        };
    }, [summary.slug]);

    return (
        <div
            className={`desk desk--${summary.code}`}
            role="dialog"
            aria-modal="true"
            aria-label={summary.title}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            {scene.photo && (
                <figure
                    key={`${summary.slug}-photo`}
                    className="prop polaroid"
                    onMouseEnter={(e) => wiggle(e.currentTarget)}
                >
                    <img src={photo} alt="Wilson Arlando" />
                    <figcaption>{scene.photo}</figcaption>
                </figure>
            )}
            <p key={`${summary.slug}-memo`} className="prop prop--memo" onMouseEnter={(e) => wiggle(e.currentTarget)}>
                <span>Memo</span>
                {summary.summary}
            </p>
            {scene.props.map((p) => (
                <div
                    key={`${summary.slug}-${p}`}
                    className={`prop prop--${p}`}
                    onMouseEnter={(e) => wiggle(e.currentTarget)}
                />
            ))}
            <div className="dossier" key={summary.slug}>
                <span className="clip" aria-hidden="true" />
                <article className="sheet">
                    <button
                        type="button"
                        className="stamp"
                        onClick={(e) =>
                            animate(e.currentTarget, {
                                scale: [3, 1],
                                opacity: [0, 0.9],
                                ease: "inQuad",
                                duration: 300,
                            })
                        }
                    >
                        {scene.stamp}
                    </button>
                    <header className="sheet__head">Case file {summary.code} · Wilson Arlando</header>
                    <h2 className="sheet__title">{summary.title}</h2>
                    <div className="sheet__body">
                        {current ? <Markdown>{current.body}</Markdown> : <p>Retrieving evidence…</p>}
                    </div>
                    <Statements slug={summary.slug} />
                </article>
            </div>
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
