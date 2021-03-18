import * as $e from "express";
import { getStatusText, OK } from "http-status-codes";

export function routes (): $e.Router {
    const api: $e.Router = $e.Router();

    api.get("/", (req: $e.Request, res: $e.Response) => {
        return res.status(OK).send({success: true, message: getStatusText(OK)});
    });

    api.get("/smokeTest", (req: $e.Request, res: $e.Response) => {
      return res.status(OK).send({success: true, message: "Smoke test"});
    });

    return api;
}
