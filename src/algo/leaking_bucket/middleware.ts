import { FastifyReply, FastifyRequest } from "fastify";
import { LeakyBucketService } from "./service";

const service = new LeakyBucketService();

export async function LeakyBucketLimiter(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const key = `rate-limit:${request.ip}`;

    const allowed = await service.allowRequest(key);

    if (!allowed) {
        return reply.status(429).send({
            success: false,
            message: "Too Many Requests",
        });
    }
}