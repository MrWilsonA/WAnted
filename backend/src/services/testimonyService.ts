import { z } from "zod";
import { HttpError } from "../lib/httpError";
import { testimonyRepository } from "../repositories/testimonyRepository";
import { caseFileService } from "./caseFileService";

const schema = z.object({
    name: z.string().trim().min(1).max(60),
    message: z.string().trim().min(1).max(500),
});

export const testimonyService = {
    async list(slug: string) {
        const caseFile = await caseFileService.getBySlug(slug);
        return testimonyRepository.findVisibleByCaseFile(caseFile.id);
    },

    async create(slug: string, input: unknown) {
        const parsed = schema.safeParse(input);
        if (!parsed.success) {
            throw new HttpError(400, "Name (max 60) and message (max 500) are required");
        }
        const caseFile = await caseFileService.getBySlug(slug);
        return testimonyRepository.create({ caseFileId: caseFile.id, ...parsed.data });
    },
};
