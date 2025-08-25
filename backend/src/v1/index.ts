
import express, { Router } from "express";
import errorHandler from "./middleware/error.middleware";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./swagger";
import user from "./user/user.router";
import tasks from "./task/task.router";
import category from "./category/category.router";
import label from "./label/label.router";

const v1: Router = express.Router();

/**
 * Routes
 */
v1.use("/auth", user)
v1.use("/tareas", tasks)
v1.use("/categorias", category)
v1.use("/etiquetas", label)

/**
 * Middlewares
*/
v1.use(errorHandler);

/**
 * Swagger Documentation
 */
v1.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default v1;