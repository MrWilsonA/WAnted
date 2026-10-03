import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../lib/httpError";
import { logger } from "../lib/logger";

export function notFoundHandler(_req: Request, res: Response) {
    res.status(404).json({ error: "Not found" });
}

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof HttpError) {
        res.status(err.status).json({ error: err.message });
        return;
    }
    logger.error(err);
    res.status(500).json({ error: "Internal server error" });
}