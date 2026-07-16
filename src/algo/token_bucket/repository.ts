import {redisClient} from "../../config/radis";
import {Bucket} from "./types"

export class TokenBucketRepository {
    async get(key:string) : Promise<Bucket | null> {
        const bucket = await redisClient.get(key);

        if(!bucket){
            return null;
        }

        return JSON.parse(bucket);
    }
    async save(key:string, bucket:Bucket) : Promise<void> {
        await redisClient.set(key, JSON.stringify(bucket));
    }
}