import { FastifyInstance } from "fastify";
import { LeakyBucketLimiter } from "../algo/leaking_bucket/middleware";

export async function leakyBucketRoutes(app: FastifyInstance) {
    app.get(
        "/leaky-bucket",
        {
            preHandler: LeakyBucketLimiter,
        },
        async () => {
            return {
                success: true,
                message: "Request allowed by Leaky Bucket",
            };
        }
    );
}