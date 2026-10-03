import type { CSSProperties } from "react";

export interface Point {
    x: number;
    y: number;
}

export interface Placement extends Point {
    rotate: number;
}

export interface Clue extends Placement {
    label: string;
    text: string;
    quote?: boolean;
}

export const place = (p: Placement) =>
    ({ left: `${p.x}%`, top: `${p.y}%`, "--rotate": `${p.rotate}deg` }) as CSSProperties;

export const poster: Placement = { x: 50, y: 11, rotate: 1 };

export const placements: Record<string, Placement> = {
    "1a": { x: 13, y: 6, rotate: -4 },
    "1b": { x: 29, y: 31, rotate: 3 },
    "1c": { x: 13, y: 58, rotate: -2 },
    "1d": { x: 87, y: 6, rotate: 4 },
    "1e": { x: 71, y: 31, rotate: -3 },
    "1f": { x: 87, y: 58, rotate: 2 },
};

export const clues: Record<string, Clue> = {
    major: { x: 31, y: 4, rotate: 3, label: "Major", text: "Computer Science & Mathematics" },
    target: { x: 69, y: 4, rotate: -3, label: "Target position", text: "Assistant Development Officer" },
    exhibitA: {
        x: 32, y: 70, rotate: -2, quote: true, label: "Exhibit A",
        text: "“I do not see weaknesses as excuses. I see them as areas that require a system.”",
    },
    exhibitB: {
        x: 68, y: 70, rotate: 3, quote: true, label: "Exhibit B",
        text: "“Every assistant should be able to explain what they built, why they built it, and how it works.”",
    },
};

export const anchors: Record<string, Point> = {
    hub: { x: 50, y: 88 },
    west: { x: -3, y: 40 },
    east: { x: 103, y: 42 },
    north: { x: 60, y: -4 },
    south: { x: 38, y: 104 },
    southWest: { x: -3, y: 92 },
    southEast: { x: 103, y: 94 },
};

export const strings: [string, string][] = [
    ["poster", "1a"], ["poster", "1b"], ["poster", "1c"], ["poster", "1d"], ["poster", "1e"], ["poster", "1f"],
    ["1a", "1b"], ["1b", "1c"], ["1d", "1e"], ["1e", "1f"], ["1a", "1c"], ["1d", "1f"],
    ["major", "1a"], ["major", "1b"], ["major", "poster"], ["target", "poster"], ["target", "1d"], ["target", "1e"],
    ["exhibitA", "1b"], ["exhibitA", "1c"], ["exhibitB", "1e"], ["exhibitB", "1f"],
    ["hub", "exhibitA"], ["hub", "exhibitB"], ["hub", "1c"], ["hub", "1f"],
    ["west", "1a"], ["west", "1c"], ["east", "1d"], ["east", "1f"], ["north", "major"], ["north", "target"],
    ["south", "hub"], ["southWest", "exhibitA"], ["southEast", "exhibitB"],
];
