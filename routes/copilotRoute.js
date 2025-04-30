import express from 'express';
import { helloTest, getParticipantSummary } from '../controllers/copilotController.js';
import { authenticateToken } from '../middleware/authenticate.js';

const router = express.Router();

// ✅ Hello Test API (Protected)
router.get('/hello', authenticateToken, helloTest);

// ✅ Participant Summary API (Protected)
router.get('/participant-summary', authenticateToken, getParticipantSummary);

export default router;
