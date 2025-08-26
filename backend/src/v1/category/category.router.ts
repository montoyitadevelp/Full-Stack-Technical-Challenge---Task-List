import { Router } from "express";
import {
  categoryCreateValidationSchema,
  categoryUpdateValidationSchema,
} from "./category.schema";
import * as ctrl from "./category.controller";
import validateRequest from "../middleware/schema.middleware";
import authHandler from "../middleware/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Categorias
 */
router.use(authHandler);
/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Get all categories
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CategoryResponse'
 */
router.get("/", ctrl.listCategory);

/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponse'
 *       404:
 *         description: Category not found
 */
router.get("/:id", ctrl.getCategoryById);


/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Create a category
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryCreate'
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponse'
 */
router.post("/", validateRequest(categoryCreateValidationSchema), ctrl.createCategory);

/**
 * @swagger
 * /categorias/{id}:
 *   patch:
 *     summary: Update a category
 *     tags: [Categorias]
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
 *             $ref: '#/components/schemas/CategoryUpdate'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponse'
 */
router.patch("/:id", validateRequest(categoryUpdateValidationSchema), ctrl.updateCategory);

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categorias]
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
 *         description: Category deleted successfully
 */
router.delete("/:id", ctrl.deleteCategory);

export default router;
