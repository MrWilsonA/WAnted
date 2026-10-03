import { useEffect, useState } from "react";
import { animate, createTimeline, stagger, svg } from "animejs";
import { getCaseFiles } from "../../api/caseFiles";
import PinnedNote from "../../components/PinnedNote";
import WantedPoster from "../../components/WantedPoster";
import type { CaseFileSummary } from "../../types/caseFile";
import CaseDesk from "./CaseDesk";
import { anchors, clues, place, placements, poster, strings, type Point } from "./layout";
import "./board.css";

const points: Record<string, Point> = { poster, ...placements, ...clues, ...anchors };

export default function Board() {
    const [loaded, setLoaded] = useState<CaseFileSummary[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const caseFiles = loaded ?? [];
    const [open, setOpen] = useState<number | null>(null);
    const [seen, setSeen] = useState<number[]>([]);
    const [hot, setHot] = useState<string | null>(null);
    const ready = loaded !== null || error !== null;

    const go = (i: number) => {
        setOpen(i);
        setSeen((s) => [...s, i]);
    };

    const trace = (key: string | null) => {
        setHot(key);
        if (!key) return;
        animate(svg.createDrawable(`.string[data-a="${key}"], .string[data-b="${key}"]`), {
            draw: ["0 0", "0 1"],
            duration: 600,
            ease: "outQuad",
        });
        animate(`.pin[data-key="${key}"]`, { scale: [{ to: 1.8 }, { to: 1 }], duration: 500 });
    };

    useEffect(() => {
        getCaseFiles()
            .then(setLoaded)
            .catch((err: Error) => setError(err.message));
    }, []);

    useEffect(() => {
        if (!ready) return;
        const tl = createTimeline({ defaults: { ease: "outExpo", duration: 700 } })
            .add(".poster", { opacity: [0, 1], y: [-60, 0], scale: [1.15, 1] })
            .add(".note, .clue", { opacity: [0, 1], y: [-40, 0], scale: [1.1, 1], delay: stagger(70) }, "-=450")
            .add(".pin", { opacity: [0, 1], scale: [0, 1], ease: "outBack(3)", duration: 400, delay: stagger(30) }, "-=300")
            .add(
                svg.createDrawable(".string"),
                { opacity: [0, 1], draw: ["0 0", "0 1"], ease: "inOutQuad", duration: 900, delay: stagger(35) },
                "-=200",
            );
        return () => {
            tl.revert();
        };
    }, [ready]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (!caseFiles.length) return;
            if (e.key === "Escape") setOpen(null);
            if (e.key === "ArrowRight") go(open === null ? 0 : Math.min(open + 1, caseFiles.length - 1));
            if (e.key === "ArrowLeft" && open !== null) go(Math.max(open - 1, 0));
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    });

    const shown = [
        "poster",
        ...Object.keys(clues),
        ...Object.keys(anchors),
        ...caseFiles.map((c) => c.code).filter((c) => placements[c]),
    ];
    const at = (k: string) => ({ x: points[k].x * 1.6, y: points[k].y * 0.9 });

    return (
        <main className="board">
            <div
                className="stage"
                onPointerMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
            >
                <WantedPoster />
                {caseFiles.map(
                    (c, i) =>
                        placements[c.code] && (
                            <PinnedNote
                                key={c.code}
                                caseFile={c}
                                placement={placements[c.code]}
                                seen={seen.includes(i)}
                                onOpen={() => go(i)}
                                onHover={(on) => trace(on ? c.code : null)}
                            />
                        ),
                )}
                {Object.entries(clues).map(([id, c]) => (
                    <div
                        key={id}
                        className={`paper clue${c.quote ? " clue--quote" : ""}`}
                        style={place(c)}
                        onMouseEnter={() => trace(id)}
                        onMouseLeave={() => trace(null)}
                    >
                        <span className="clue__label">{c.label}</span>
                        <span className="clue__text">{c.text}</span>
                    </div>
                ))}
                <svg className={`strings${hot ? " strings--focus" : ""}`} viewBox="0 0 160 90" aria-hidden="true">
                    <defs>
                        <radialGradient id="pin" cx="35%" cy="35%">
                            <stop offset="0" stopColor="#ff9d9d" />
                            <stop offset="0.5" stopColor="#e5282b" />
                            <stop offset="1" stopColor="#6e0c0f" />
                        </radialGradient>
                        <filter id="shadow" filterUnits="userSpaceOnUse" x="0" y="0" width="160" height="90">
                            <feDropShadow dx="0.3" dy="0.5" stdDeviation="0.3" floodOpacity="0.6" />
                        </filter>
                    </defs>
                    <g filter="url(#shadow)">
                        {strings
                            .filter(([a, b]) => shown.includes(a) && shown.includes(b))
                            .map(([a, b]) => (
                                <line
                                    key={`${a}-${b}`}
                                    className={`string${hot === a || hot === b ? " string--hot" : ""}`}
                                    data-a={a}
                                    data-b={b}
                                    x1={at(a).x}
                                    y1={at(a).y}
                                    x2={at(b).x}
                                    y2={at(b).y}
                                />
                            ))}
                        {shown.map((k) => (
                            <circle
                                key={k}
                                className="pin"
                                data-key={k}
                                cx={at(k).x}
                                cy={at(k).y}
                                r="0.8"
                                fill="url(#pin)"
                            />
                        ))}
                    </g>
                </svg>
                {error && <p className="board__error">Failed to load case files: {error}</p>}
            </div>
            {open !== null && (
                <CaseDesk files={caseFiles} index={open} onGo={go} onClose={() => setOpen(null)} />
            )}
        </main>
    );
}
