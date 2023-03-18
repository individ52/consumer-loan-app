import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import errorMiddleware from "../src/middlewares/error-middleware.js";
import routers from "./router/index.js";

function createServer() {

    const app = express();

    app.use(express.json());
    app.use(cookieParser());
    app.use(
        cors({
            credentials: true,
        })
    );
    routers.forEach((router) => app.use("/api", router));
    app.use(errorMiddleware);

    return app;
}

export default createServer;
