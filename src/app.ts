import fastify from "fastify";
import { tokenBucketRoutes } from "./routes/tokenbucket";

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

    return app;
}