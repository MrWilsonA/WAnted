import { prisma } from "../lib/prisma";

export const caseFileRepository = {
    findAll() {
        return prisma.caseFile.findMany({
            orderBy: { position: "asc" },
            select: { code: true, slug: true, position: true, title: true, summary: true },
        });
    },

    findBySlug(slug: string) {
        return prisma.caseFile.findUnique({ where: { slug } });
    },
};