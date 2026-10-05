import type { CSSProperties } from "react";

export interface Point {
    x: number;
    y: number;
}

export interface Placement extends Point {
    rotate: number;
}

export interface Clue extends Placement {
    kind: "tape" | "index" | "news" | "photo" | "typed" | "grid" | "kraft";
    label?: string;
    text: string;
}

export const place = (p: Placement) =>
    ({ left: `${p.x}%`, top: `${p.y}%`, "--rotate": `${p.rotate}deg` }) as CSSProperties;

export const poster: Placement = { x: 50, y: 24, rotate: 1 };

export const placements: Record<string, Placement> = {
    "1a": { x: 12, y: 5, rotate: -4 },
    "1b": { x: 29, y: 32, rotate: 3 },
    "1c": { x: 12, y: 62, rotate: -2 },
    "1d": { x: 88, y: 5, rotate: 4 },
    "1e": { x: 71, y: 32, rotate: -3 },
    "1f": { x: 88, y: 62, rotate: 2 },
};

export const clues: Record<string, Clue> = {
    label: { x: 50, y: 8, rotate: -2, kind: "tape", text: "Case 27-1 - New AstDev" },
    major: { x: 30, y: 5, rotate: 3, kind: "index", label: "Major", text: "Computer Science & Mathematics" },
    target: { x: 70, y: 5, rotate: -3, kind: "news", label: "The Lab Gazette", text: "Wanted: Assistant Development Officer" },
    photo: { x: 12, y: 35, rotate: -6, kind: "photo", text: "Last seen: the lab" },
    motive: {
        x: 88, y: 35, rotate: 5, kind: "typed", label: "Motive",
        text: "Support the growth of Junior Laboratory Assistants.",
    },
    exhibitA: {
        x: 29, y: 72, rotate: -2, kind: "grid", label: "Exhibit A",
        text: "“I do not see weaknesses as excuses. I see them as areas that require a system.”",
    },
    exhibitB: {
        x: 71, y: 72, rotate: 3, kind: "kraft", label: "Exhibit B",
        text: "“In every aspect always prepare for the worst and hope for the best.”",
    },
    modus: { x: 50, y: 80, rotate: 2, kind: "typed", label: "Modus operandi", text: "Notes, reminders, references. Start early." },
};

export const anchors: Record<string, Point> = {
    west: { x: -3, y: 45 },
    east: { x: 103, y: 45 },
    northWest: { x: 20, y: -4 },
    northEast: { x: 80, y: -4 },
    south: { x: 40, y: 104 },
    southWest: { x: -3, y: 95 },
    southEast: { x: 103, y: 95 },
};

export const strings: [string, string][] = [
    ["poster", "1a"], ["poster", "1b"], ["poster", "1c"], ["poster", "1d"], ["poster", "1e"], ["poster", "1f"],
    ["poster", "label"], ["1a", "1b"], ["1b", "1c"], ["1d", "1e"], ["1e", "1f"],
    ["1a", "photo"], ["photo", "1c"], ["1d", "motive"], ["motive", "1f"],
    ["major", "1a"], ["major", "1b"], ["major", "label"], ["target", "1d"], ["target", "1e"], ["target", "label"],
    ["exhibitA", "1b"], ["exhibitA", "1c"], ["exhibitA", "modus"], ["exhibitB", "1e"], ["exhibitB", "1f"], ["exhibitB", "modus"],
    ["west", "photo"], ["west", "1c"], ["east", "motive"], ["east", "1f"], ["northWest", "major"], ["northEast", "target"],
    ["south", "modus"], ["southWest", "exhibitA"], ["southEast", "exhibitB"],
];
