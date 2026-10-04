import express from "express";
import helmet from "helmet";
import cors from "cors";
import pinoHttp from "pino-http";
import { env } from "./config/env";
import { logger } from "./lib/logger";
import { prisma } from "./lib/prisma";
import { caseFileRoutes } from "./routes/caseFileRoutes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

const app = express();
app.set("trust proxy", 1);

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json({ limit: "10kb" }));
app.use(pinoHttp({ logger }));

app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});

app.get("/health/ready", async (_req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({ status: "ready" });
    } catch (err) {
        logger.error(err, "Readiness check failed");
        res.status(503).json({ status: "not ready" });
    }
});

app.use("/api/case-files", caseFileRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;