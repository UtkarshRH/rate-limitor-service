import fastify from "fastify";

export function buildApp(){
    const app = fastify({
        logger : true,
    });

    app.get("/helth", async () =>{
        return {
            status : "ok",
            message: "Rate limitor service is flying 🚀🚀🚀"
        }
    });

    return app;
}