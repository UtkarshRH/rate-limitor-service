import fastify from "fastify";
import { tokenBucketRoutes } from "./routes/tokenbucket";
import { leakyBucketRoutes } from "./routes/leakyBucket";

export function buildApp() {
    const app = fastify({
        logger: true,
    });

    app.get("/health", async () => {
        return {
            status: "ok",
            message: "Rate limiter service is flying 🚀",
        };
    });

    app.register(tokenBucketRoutes);

    app.register(leakyBucketRoutes);

    return app;
}