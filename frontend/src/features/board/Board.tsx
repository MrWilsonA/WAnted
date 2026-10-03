import { useEffect, useState } from "react";
import { animate, stagger } from "animejs";
import { getCaseFiles } from "../../api/caseFiles";
import PinnedNote from "../../components/PinnedNote";
import WantedPoster from "../../components/WantedPoster";
import type { CaseFileSummary } from "../../types/caseFile";
import { placements, poster, strings } from "./layout";
import "./board.css";

const points = { poster, ...placements } as Record<string, { x: number; y: number }>;

export default function Board() {
    const [caseFiles, setCaseFiles] = useState<CaseFileSummary[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getCaseFiles()
            .then(setCaseFiles)
            .catch((err: Error) => setError(err.message));
    }, []);

    useEffect(() => {
        if (!caseFiles.length) return;
        const notes = animate(".note", { opacity: [0, 1], y: [16, 0], delay: stagger(90) });
        const lines = animate(".string", {
            opacity: [0, 1],
            delay: stagger(70, { start: 400 }),
            duration: 700,
        });
        return () => {
            notes.revert();
            lines.revert();
        };
    }, [caseFiles]);

    const loaded = new Set(caseFiles.map((c) => c.code));

    return (
        <main className="board">
            <svg className="strings" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {strings
                    .filter(([a, b]) => [a, b].every((k) => k === "poster" || loaded.has(k)))
                    .map(([a, b]) => (
                        <line
                            key={`${a}-${b}`}
                            className="string"
                            x1={points[a].x}
                            y1={points[a].y}
                            x2={points[b].x}
                            y2={points[b].y}
                        />
                    ))}
            </svg>
            <WantedPoster />
            {error && <p className="board__error">Failed to load: {error}</p>}
            {caseFiles.map((c) => {
                const placement = placements[c.code];
                if (!placement) return null;
                return (
                    <PinnedNote
                        key={c.code}
                        caseFile={c}
                        placement={placement}
                        onOpen={(slug) => console.log("open", slug)}
                    />
                );
            })}
        </main>
    );
}
