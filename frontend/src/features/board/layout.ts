import type { CSSProperties } from "react";

export interface Placement {
    x: number;
    y: number;
    rotate: number;
}

export interface Clue extends Placement {
    label: string;
    text: string;
    quote?: boolean;
}

export const place = (p: Placement) =>
    ({ left: `${p.x}%`, top: `${p.y}%`, "--rotate": `${p.rotate}deg` }) as CSSProperties;

export const poster: Placement = { x: 50, y: 15, rotate: 1 };

export const placements: Record<string, Placement> = {
    "1a": { x: 13, y: 7, rotate: -4 },
    "1b": { x: 30, y: 33, rotate: 3 },
    "1c": { x: 13, y: 60, rotate: -2 },
    "1d": { x: 87, y: 7, rotate: 4 },
    "1e": { x: 70, y: 33, rotate: -3 },
    "1f": { x: 87, y: 60, rotate: 2 },
};

export const clues: Record<string, Clue> = {
    major: { x: 31, y: 6, rotate: 3, label: "Major", text: "Computer Science & Mathematics" },
    target: { x: 69, y: 6, rotate: -3, label: "Target position", text: "Assistant Development Officer" },
    exhibitA: {
        x: 31, y: 70, rotate: -2, quote: true, label: "Exhibit A",
        text: "“I do not see weaknesses as excuses. I see them as areas that require a system.”",
    },
    exhibitB: {
        x: 69, y: 70, rotate: 3, quote: true, label: "Exhibit B",
        text: "“Every assistant should be able to explain what they built, why they built it, and how it works.”",
    },
};

export const strings: [string, string][] = [
    ["poster", "1a"], ["poster", "1b"], ["poster", "1c"], ["poster", "1d"], ["poster", "1e"], ["poster", "1f"],
    ["1a", "1b"], ["1b", "1c"], ["1d", "1e"], ["1e", "1f"],
    ["major", "1a"], ["target", "poster"], ["exhibitA", "1b"], ["exhibitB", "1f"],
];
