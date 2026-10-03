import type { CSSProperties } from "react";
import type { NotePlacement } from "../features/board/layout";
import type { CaseFileSummary } from "../types/caseFile";

interface Props {
    caseFile: CaseFileSummary;
    placement: NotePlacement;
    onOpen: (slug: string) => void;
}

export default function PinnedNote({ caseFile, placement, onOpen }: Props) {
    const style = {
        left: `${placement.x}%`,
        top: `${placement.y}%`,
        "--rotate": `${placement.rotate}deg`,
    } as CSSProperties;

    return (
        <button type="button" className="note" style={style} onClick={() => onOpen(caseFile.slug)}>
            <span className="pin" aria-hidden="true" />
            <span className="note__code">{caseFile.code}</span>
            <span className="note__title">{caseFile.title}</span>
            <span className="note__summary">{caseFile.summary}</span>
        </button>
    );
}
