import type { Request, Response } from "express";
import { testimonyService } from "../services/testimonyService";

export async function listTestimonies(req: Request<{ slug: string }>, res: Response) {
    res.json(await testimonyService.list(req.params.slug));
}

export async function createTestimony(req: Request<{ slug: string }>, res: Response) {
    res.status(201).json(await testimonyService.create(req.params.slug, req.body));
}
