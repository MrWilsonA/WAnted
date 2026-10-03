import { beforeEach, describe, expect, it, vi } from "vitest";
import { caseFileRepository } from "../../src/repositories/caseFileRepository";
import { caseFileService } from "../../src/services/caseFileService";

vi.mock("../../src/repositories/caseFileRepository", () => ({
    caseFileRepository: { findAll: vi.fn(), findBySlug: vi.fn() },
}));

describe("caseFileService.getBySlug", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("returns the case file when it exists", async () => {
        const fake = { id: 2, code: "1b", slug: "evidence", title: "Evidence" };
        vi.mocked(caseFileRepository.findBySlug).mockResolvedValue(fake as never);

        await expect(caseFileService.getBySlug("evidence")).resolves.toEqual(fake);
        expect(caseFileRepository.findBySlug).toHaveBeenCalledWith("evidence");
    });

    it("throws a 404 HttpError when it does not exist", async () => {
        vi.mocked(caseFileRepository.findBySlug).mockResolvedValue(null);

        await expect(caseFileService.getBySlug("nope")).rejects.toMatchObject({ status: 404 });
    });
});