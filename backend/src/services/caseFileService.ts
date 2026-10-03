import { HttpError } from "../lib/httpError";
import { caseFileRepository } from "../repositories/caseFileRepository";

export const caseFileService = {
    getAll() {
        return caseFileRepository.findAll();
    },

    async getBySlug(slug: string) {
        const caseFile = await caseFileRepository.findBySlug(slug);
        if (!caseFile) {
            throw new HttpError(404, "Case file not found");
        }
        return caseFile;
    },
};