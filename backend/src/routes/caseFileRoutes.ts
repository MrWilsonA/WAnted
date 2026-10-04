import { Router } from "express";
import rateLimit from "express-rate-limit";
import { env } from "../config/env";
import { getCaseFile, listCaseFiles } from "../controllers/caseFileController";
import { createTestimony, listTestimonies } from "../controllers/testimonyController";

export const caseFileRoutes = Router();

const statementLimiter = rateLimit({
    windowMs: 60_000,
    limit: 5,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    skip: () => env.NODE_ENV === "test",
    message: { error: "Too many statements, try again in a minute" },
});

caseFileRoutes.get("/", listCaseFiles);
caseFileRoutes.get("/:slug", getCaseFile);
caseFileRoutes.get("/:slug/testimonies", listTestimonies);
caseFileRoutes.post("/:slug/testimonies", statementLimiter, createTestimony);
