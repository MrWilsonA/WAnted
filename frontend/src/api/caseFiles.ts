import { apiGet } from "./client";
import type { CaseFile, CaseFileSummary } from "../types/caseFile";

export const getCaseFiles = () => apiGet<CaseFileSummary[]>("/api/case-files");

export const getCaseFile = (slug: string) =>
    apiGet<CaseFile>(`/api/case-files/${encodeURIComponent(slug)}`);