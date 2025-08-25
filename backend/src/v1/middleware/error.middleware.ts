import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../core/errors";
import config from "../../config";
import Joi from "joi";
import winston from "winston";


const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "errors.log", level: "error" }),
    ],
});

export default function errorHandler(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (res.headersSent) {
        next(error);
        return;
    }


    logger.error({
        message: (error as Error).message || "Unknown error",
        stack: (error as Error).stack,
        path: req.url,
        method: req.method,
    });


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
    return res.status(500).json({ error: { message: (error as Error).message || "Internal Server Error", code: 500, }, });
}