import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import app from "../../src/app";
import { caseFileRepository } from "../../src/repositories/caseFileRepository";

vi.mock("../../src/repositories/caseFileRepository", () => ({
    caseFileRepository: { findAll: vi.fn(), findBySlug: vi.fn() },
}));

describe("API", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("GET /health answers ok", async () => {
        const res = await request(app).get("/health");

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ status: "ok" });
    });

    it("GET /api/case-files returns the list", async () => {
        vi.mocked(caseFileRepository.findAll).mockResolvedValue([
            { code: "1a", slug: "suspect-profile", position: 1, title: "Suspect Profile", summary: "" },
        ] as never);

        const res = await request(app).get("/api/case-files");

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].slug).toBe("suspect-profile");
    });

    it("GET /api/case-files/:slug returns one case file", async () => {
        vi.mocked(caseFileRepository.findBySlug).mockResolvedValue({
            id: 2,
            code: "1b",
            slug: "evidence",
            title: "Evidence",
        } as never);

        const res = await request(app).get("/api/case-files/evidence");

        expect(res.status).toBe(200);
        expect(res.body.code).toBe("1b");
    });

    it("GET /api/case-files/:slug answers 404 for an unknown slug", async () => {
        vi.mocked(caseFileRepository.findBySlug).mockResolvedValue(null);

        const res = await request(app).get("/api/case-files/nope");

        expect(res.status).toBe(404);
        expect(res.body).toEqual({ error: "Case file not found" });
    });

    it("answers 404 for a route that does not exist", async () => {
        const res = await request(app).get("/api/unknown");

        expect(res.status).toBe(404);
    });
});