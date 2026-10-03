import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "node",
        include: ["tests/**/*.test.ts"],
        env: {
            NODE_ENV: "test",
            LOG_LEVEL: "fatal",
            CORS_ORIGIN: "http://localhost:5173",
            DATABASE_URL: "postgresql://test:test@localhost:5432/test",
        },
    },
});