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
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Filter by completion status
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *         description: Filter by priority level
 *       - in: query
 *         name: dueDateStart
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date of due date range
 *       - in: query
 *         name: dueDateEnd
 *         schema:
 *           type: string
 *           format: date
 *         description: End date of due date range
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in title and description
 *       - in: query
 *         name: tags
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         style: form
 *         explode: true
 *         description: Filter by tag IDs
 * 
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number to retrieve
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of records per page
 *
 *     responses:
 *       200:
 *         description: Paginated list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskPaginated'
 */
router.get("/", ctrl.getTasks);


/**
 * @swagger
 * /tareas/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *       404:
 *         description: Task not found
 */
router.get("/:id", ctrl.getTaskById);


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
 *   patch:
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
router.patch("/:id", validateRequest(taskUpdateValidationSchema), ctrl.updateTask);

/**
 * @swagger
 * /tareas/completar/{id}:
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
router.patch("/completar/:id", ctrl.toggleTaskCompletion);


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

export default router;
