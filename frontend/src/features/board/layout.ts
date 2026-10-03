export interface NotePlacement {
    x: number;
    y: number;
    rotate: number;
    tone: "yellow" | "green" | "white";
}

export const placements: Record<string, NotePlacement> = {
    "1a": { x: 17, y: 22, rotate: -3, tone: "yellow" },
    "1b": { x: 50, y: 10, rotate: 2, tone: "white" },
    "1c": { x: 83, y: 22, rotate: 4, tone: "green" },
    "1d": { x: 17, y: 76, rotate: 3, tone: "green" },
    "1e": { x: 50, y: 90, rotate: -2, tone: "yellow" },
    "1f": { x: 83, y: 76, rotate: -4, tone: "white" },
};