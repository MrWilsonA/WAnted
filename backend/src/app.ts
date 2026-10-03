import express from "express";
import helmet from "helmet";
import cors from "cors";
import pinoHttp from "pino-http";
import { env } from "./config/env";
import { logger } from "./lib/logger";
import { prisma } from "./lib/prisma";

const app = express();

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

app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
});

app.use(
    (err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
        logger.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
);

export default app;