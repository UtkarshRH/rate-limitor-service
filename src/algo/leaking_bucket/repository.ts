import { redisClient } from "../../config/radis";
import { LeakyBucket } from "./types";

export class LeakyBucketRepository {
    async get(key: string): Promise<LeakyBucket | null> {
        const bucket = await redisClient.get(key);

        if (!bucket) {
            return null;
        }

        return JSON.parse(bucket);
    }
    async save(key: string, bucket: LeakyBucket): Promise<void> {
        await redisClient.set(key, JSON.stringify(bucket));
    }
}