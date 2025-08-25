import { Router } from "express";
import * as ctrl from "./task.controller";
import authHandler from "../middleware/auth.middleware";
import validateRequest from "../middleware/schema.middleware";
import { taskCreateValidationSchema, taskUpdateValidationSchema } from "./task.schema";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tareas
 */
router.use(authHandler);

/**
 * @swagger
 * /tareas:
 *   get:
 *     summary: List all tasks
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaskResponse'
 */
router.get("/", ctrl.getTasks);

/**
 * @swagger
 * /tareas:
 *   post:
 *     summary: Create a new task
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskCreate'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 */
router.post("/", validateRequest(taskCreateValidationSchema), ctrl.createTask);

/**
 * @swagger
 * /tareas/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskUpdate'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 */
router.put("/:id", validateRequest(taskUpdateValidationSchema), ctrl.updateTask);

/**
 * @swagger
 * /tareas/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Task deleted successfully
 */
router.delete("/:id", ctrl.deleteTask);

/**
 * @swagger
 * /tareas/{id}/completar:
 *   patch:
 *     summary: Toggle task completion
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Task completion toggled
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 */
router.patch("/:id/completar", ctrl.toggleTaskCompletion);

export default router;
