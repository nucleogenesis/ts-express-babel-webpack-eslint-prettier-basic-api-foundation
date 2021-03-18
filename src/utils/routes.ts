import * as express from "express";
import { getStatusText, OK } from "http-status-codes";

export function routes (): express.Router {
    const api: express.Router = express.Router();

    api.get("/", (req: express.Request, res: express.Response) => {
        return res.status(OK).send({success: true, message: getStatusText(OK)});
    });

    return api;
}
