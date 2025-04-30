import express from 'express';
import { generateToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/generate-token', generateToken);

export default router;
