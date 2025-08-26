import { Router } from "express";
import { labelCreateValidationSchema, labelUpdateValidationSchema } from "./label.schema";
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


/**
 * @swagger
 * /etiquetas/{id}:
 *   delete:
 *     summary: Delete a label
 *     tags: [Etiquetas]
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
 *         description: Label deleted successfully
 */
router.delete("/:id", ctrl.deleteLabel);


export default router
