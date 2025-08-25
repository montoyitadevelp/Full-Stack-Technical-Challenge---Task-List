
import express, { Router } from "express";
import errorHandler from "./middleware/error.middleware";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./swagger";

const v1: Router = express.Router();


/**
 * Routes
 */
// v1.use("/user", user)


/**
 * Middlewares
*/
v1.use(errorHandler);

/**
 * Swagger Documentation
 */
v1.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default v1;