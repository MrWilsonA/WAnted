import { Router } from "express";
import { getCaseFile, listCaseFiles } from "../controllers/caseFileController";

export const caseFileRoutes = Router();

caseFileRoutes.get("/", listCaseFiles);
caseFileRoutes.get("/:slug", getCaseFile);