import { TOKEN_BUCKET_CONFIG } from "./config";
import { TokenBucketRepository } from "./repository";

export class TokenBucketService {
  constructor(private repository = new TokenBucketRepository()) {}

  async allowRequest(key: string): Promise<boolean> {
    const now = Date.now();

    let bucket = await this.repository.get(key);

    if (!bucket) {
      bucket = {
        tokens: TOKEN_BUCKET_CONFIG.capacity,
        lastRefill: now,
      };
    }

    const elapsed = (now - bucket.lastRefill) / 1000;

    const refillTokens = elapsed * TOKEN_BUCKET_CONFIG.refillRate;

    bucket.tokens = Math.min(
      TOKEN_BUCKET_CONFIG.capacity,
      bucket.tokens + refillTokens
    );

    bucket.lastRefill = now;

    if (bucket.tokens < 1) {
      await this.repository.save(key, bucket);
      return false;
    }

    bucket.tokens -= 1;

    await this.repository.save(key, bucket);

    return true;
  }
}