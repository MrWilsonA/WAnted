export interface Point {
    x: number;
    y: number;
}

export interface NotePlacement extends Point {
    rotate: number;
}

export const poster: Point = { x: 50, y: 32 };

export const placements: Record<string, NotePlacement> = {
    "1a": { x: 16, y: 14, rotate: -4 },
    "1b": { x: 50, y: 5, rotate: 2 },
    "1c": { x: 84, y: 14, rotate: 5 },
    "1d": { x: 16, y: 64, rotate: 3 },
    "1e": { x: 50, y: 80, rotate: -2 },
    "1f": { x: 84, y: 64, rotate: -5 },
};

export const strings: [string, string][] = [
    ["poster", "1a"], ["poster", "1c"], ["poster", "1d"], ["poster", "1f"],
    ["1a", "1b"], ["1b", "1c"], ["1d", "1e"], ["1e", "1f"], ["1b", "poster"], ["poster", "1e"],
    ["1a", "1d"], ["1c", "1f"],
];
