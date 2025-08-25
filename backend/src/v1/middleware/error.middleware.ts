import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../core/errors";
import config from "../../config";
import Joi from "joi";


export default function errorHandler(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (res.headersSent || config.debug) {
        next(error);
        return;
    }


    if (Joi.isError(error)) {
        const validationError = {
            error: {
                message: "Validation error",
                code: "ERR_VALID",
                errors: error.details.map((item) => ({
                    message: item.message,
                })),
            },
        };
        res.status(422).json(validationError);
        return;
    }


    if (error instanceof ApplicationError) {
        if (error.message) {
            return res.status(error.code).json({
                error: {
                    message: error.message,
                    code: error.code,
                },
            });
        }
    }

    next(error);

}