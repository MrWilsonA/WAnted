import { apiGet, apiPost } from "./client";
import type { Testimony } from "../types/testimony";

const path = (slug: string) => `/api/case-files/${encodeURIComponent(slug)}/testimonies`;

export const getTestimonies = (slug: string) => apiGet<Testimony[]>(path(slug));

export const addTestimony = (slug: string, input: { name: string; message: string }) =>
    apiPost<Testimony>(path(slug), input);
