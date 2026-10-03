import { useEffect, useState } from "react";
import { getCaseFiles } from "../../api/caseFiles";
import PinnedNote from "../../components/PinnedNote";
import WantedPoster from "../../components/WantedPoster";
import type { CaseFileSummary } from "../../types/caseFile";
import { placements } from "./layout";
import "./board.css";

export default function Board() {
    const [caseFiles, setCaseFiles] = useState<CaseFileSummary[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getCaseFiles()
            .then(setCaseFiles)
            .catch((err: Error) => setError(err.message));
    }, []);

    return (
        <main className="board">
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