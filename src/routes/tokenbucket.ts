import { FastifyInstance } from "fastify";
import { tokenBucketLimiter } from "../algo/token_bucket/middleware";

export async function tokenBucketRoutes(app: FastifyInstance) {
    app.get(
        "/token-bucket",
        {
            preHandler: tokenBucketLimiter,
        },
        async () => {
            return {
                success: true,
                message: "Request allowed by Token Bucket",
            };
        }
    );
}