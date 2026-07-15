import { buildApp } from "./app";
import { env } from "./config/env";
import { redisClient } from "./config/radis";

const app = buildApp();

async function start() {
    try{

        await redisClient.connect();

        console.log("Redis is flying 🚀🚀🚀");

        await app.listen({
             port: env.PORT,
             host: env.HOST,    
        });

        console.log("Rate limitor service is flying 🚀🚀🚀");
        console.log("Listning on port 3000",app.server.address());
    }catch(error){
        console.error("Error starting rate limitor service 💥💥💥", error);
        process.exit(1);
    }
}

start();