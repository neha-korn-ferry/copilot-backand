import express from 'express';
import { helloReturn } from '../controllers/privateControllar.js';
import { CheckAuthenticate } from '../middleware/authenticate.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: User  # This will associate this route with the "User" tag defined above
 *   - name: Auth  # You can also use multiple tags for the same route
 */

/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Return a hello message (Protected Route)
 *     description: Requires a valid JWT token to access.
 *     security:
 *       - bearerAuth: []  # Important for protected APIs
 *     tags:
 *       - User  # This will also associate this endpoint with the "User" tag
 *     responses:
 *       200:
 *         description: Successful hello message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized (invalid or missing token)
 */
router.get('/hello', CheckAuthenticate, helloReturn);

export default router;
