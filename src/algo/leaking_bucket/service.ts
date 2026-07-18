import { LEAKY_BUCKET_CONFIG } from "./config";
import { LeakyBucketRepository } from "./repository";
import { LeakyBucket } from "./types";

export class LeakyBucketService {
    private repository = new LeakyBucketRepository();

    async allowRequest(key: string): Promise<boolean> {
        const now = Date.now();

        let bucket = await this.repository.get(key);

        if (!bucket) {
            bucket = {
                queueSize: 0,
                lastLeakTime: now,
            };
        }

        // calculate elapsed time 
        const elapsedTime = (now - bucket.lastLeakTime) / 1000;

        // calculate leak req amount 
        const leakedRequests = Math.floor(elapsedTime * LEAKY_BUCKET_CONFIG.leakRate);

        // remove leak req 
        if (leakedRequests > 0) {
            bucket.queueSize = Math.max(
                0,
                bucket.queueSize - leakedRequests
            );

            // Update the last leak time
            const timeUsed =
                (leakedRequests / LEAKY_BUCKET_CONFIG.leakRate) * 1000;

            bucket.lastLeakTime += timeUsed;
        }

        if (bucket.queueSize >= LEAKY_BUCKET_CONFIG.capacity) {
            await this.repository.save(key, bucket);
            return false;
        }

        bucket.queueSize++;

        await this.repository.save(key, bucket);

        return true;
    }
}