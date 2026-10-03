import { place, type Placement } from "../features/board/layout";
import type { CaseFileSummary } from "../types/caseFile";

interface Props {
    caseFile: CaseFileSummary;
    placement: Placement;
    seen: boolean;
    onOpen: () => void;
}

export default function PinnedNote({ caseFile, placement, seen, onOpen }: Props) {
    return (
        <button
            type="button"
            className={`paper note${seen ? " note--seen" : ""}`}
            style={place(placement)}
            onClick={onOpen}
        >
            <span className="note__code">File {caseFile.code}</span>
            <span className="note__title">{caseFile.title}</span>
            <span className="note__summary">{caseFile.summary}</span>
        </button>
    );
}
