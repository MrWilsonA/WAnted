export interface CaseFileSummary {
    code: string;
    slug: string;
    position: number;
    title: string;
    summary: string;
}

export interface CaseFile extends CaseFileSummary {
    id: number;
    body: string;
    updatedAt: string;
}