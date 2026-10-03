import { prisma } from "../lib/prisma";

const select = { id: true, name: true, message: true, createdAt: true };

export const testimonyRepository = {
    findVisibleByCaseFile(caseFileId: number) {
        return prisma.testimony.findMany({
            where: { caseFileId, visible: true },
            orderBy: { createdAt: "desc" },
            take: 50,
            select,
        });
    },

    create(data: { caseFileId: number; name: string; message: string }) {
        return prisma.testimony.create({ data, select });
    },
};
