import { Router } from "express";
import { userLoginValidationSchema, userRegisterValidationSchema } from "./user.schema";
import * as ctrl from "./user.controller";
import validateRequest from "../middleware/schema.middleware";
import authHandler from "../middleware/auth.middleware";

const router = Router();


/**
 * @swagger
 * tags:
 *   name: Auth
 */

/**
 * @swagger
 * /auth/registro:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post("/registro", validateRequest(userRegisterValidationSchema), ctrl.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       201:
 *         description: Login successful
 *       400:
 *         description: Validation error
 */
router.post("/login", validateRequest(userLoginValidationSchema), ctrl.login);

/**
 * @swagger
 * /auth/perfil:
 *   get:
 *     summary: Get user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       404:
 *         description: User not found
 */
router.get("/perfil", authHandler, ctrl.profile);

export default router;
