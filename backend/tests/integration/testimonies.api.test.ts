import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import app from "../../src/app";
import { caseFileRepository } from "../../src/repositories/caseFileRepository";
import { testimonyRepository } from "../../src/repositories/testimonyRepository";

vi.mock("../../src/repositories/caseFileRepository", () => ({
    caseFileRepository: { findAll: vi.fn(), findBySlug: vi.fn() },
}));

vi.mock("../../src/repositories/testimonyRepository", () => ({
    testimonyRepository: { findVisibleByCaseFile: vi.fn(), create: vi.fn() },
}));

describe("Testimonies API", () => {
    beforeEach(() => {
        vi.resetAllMocks();
        vi.mocked(caseFileRepository.findBySlug).mockResolvedValue({ id: 2, slug: "evidence" } as never);
    });

    it("GET lists visible testimonies of a case file", async () => {
        vi.mocked(testimonyRepository.findVisibleByCaseFile).mockResolvedValue([{ id: 1, name: "Ana" }] as never);

        const res = await request(app).get("/api/case-files/evidence/testimonies");

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(testimonyRepository.findVisibleByCaseFile).toHaveBeenCalledWith(2);
    });

    it("POST stores a trimmed testimony", async () => {
        vi.mocked(testimonyRepository.create).mockResolvedValue({ id: 5, name: "Ana", message: "Solid" } as never);

        const res = await request(app)
            .post("/api/case-files/evidence/testimonies")
            .send({ name: "  Ana ", message: " Solid " });

        expect(res.status).toBe(201);
        expect(testimonyRepository.create).toHaveBeenCalledWith({ caseFileId: 2, name: "Ana", message: "Solid" });
    });

    it("POST rejects an empty or too long testimony", async () => {
        const empty = await request(app).post("/api/case-files/evidence/testimonies").send({ name: " ", message: "x" });
        const long = await request(app)
            .post("/api/case-files/evidence/testimonies")
            .send({ name: "Ana", message: "x".repeat(501) });

        expect(empty.status).toBe(400);
        expect(long.status).toBe(400);
        expect(testimonyRepository.create).not.toHaveBeenCalled();
    });

    it("POST answers 404 for an unknown case file", async () => {
        vi.mocked(caseFileRepository.findBySlug).mockResolvedValue(null);

        const res = await request(app).post("/api/case-files/nope/testimonies").send({ name: "Ana", message: "Hi" });

        expect(res.status).toBe(404);
    });
});
