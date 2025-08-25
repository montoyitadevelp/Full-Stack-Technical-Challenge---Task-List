import { Router } from "express";
import { labelCreateValidationSchema } from "./label.schema";
import * as ctrl from "./label.controller";
import validateRequest from "../middleware/schema.middleware";
import authHandler from "../middleware/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Etiquetas
 */
router.use(authHandler);

/**
 * @swagger
 * /etiquetas:
 *   get:
 *     summary: Get all labels
 *     tags: [Etiquetas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of labels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LabelResponse'
 */
router.get("/", ctrl.listLabels);

/**
 * @swagger
 * /etiquetas:
 *   post:
 *     summary: Create a new label
 *     tags: [Etiquetas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LabelCreate'
 *     responses:
 *       201:
 *         description: Label created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LabelResponse'
 *       400:
 *         description: Validation error / Duplicate label
 */
router.post("/", validateRequest(labelCreateValidationSchema), ctrl.createLabel);

export default router
