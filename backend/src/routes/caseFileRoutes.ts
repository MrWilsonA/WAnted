import { Router } from "express";
import { getCaseFile, listCaseFiles } from "../controllers/caseFileController";
import { createTestimony, listTestimonies } from "../controllers/testimonyController";

export const caseFileRoutes = Router();

caseFileRoutes.get("/", listCaseFiles);
caseFileRoutes.get("/:slug", getCaseFile);
caseFileRoutes.get("/:slug/testimonies", listTestimonies);
caseFileRoutes.post("/:slug/testimonies", createTestimony);
