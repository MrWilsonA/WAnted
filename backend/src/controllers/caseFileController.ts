import type { Request, Response } from "express";
import { caseFileService } from "../services/caseFileService";

export async function listCaseFiles(_req: Request, res: Response) {
    res.json(await caseFileService.getAll());
}

export async function getCaseFile(req: Request<{ slug: string }>, res: Response) {
    res.json(await caseFileService.getBySlug(req.params.slug));
}