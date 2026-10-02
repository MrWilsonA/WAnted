import app from "./app";
import { env } from "./config/env";
import { logger } from "./lib/logger";

const server = app.listen(env.PORT, () => {
    logger.info(`API running on port ${env.PORT}`);
});

function shutdown(signal: string) {
    logger.info(`${signal} received, closing server...`);

    server.close(() => {
        logger.info("Server closed");
        process.exit(0);
    });

    setTimeout(() => {
        logger.error("Shutdown took too long, forcing exit");
        process.exit(1);
    }, 10_000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));