import { json, urlencoded } from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { routes } from "./utils/routes";
import { logger } from "./utils/logger";

/**
 * Creates an express instance.
 *
 * @param {string} env - environment in which the app will run.
 * @returns {import("express").Application} express instance.
 */
export function start(env: string): express.Application {
    logger.debug(`App running as ${env}`);
    const app: express.Application = express();

    if (env === "production") {
        app.use(helmet());
        app.disable("x-powered-by");
        app.use(compression());
    } else {
        app.use(cors());
    }
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(morgan("dev"));
    app.use("/api", routes());

    return app;
}
