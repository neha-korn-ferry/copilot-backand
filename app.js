import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { CONFIG } from './config/config.js';
import { requestLogger } from './config/logger.js';
import jwtLogger from './middleware/jwtLogger.js';
import authRouter from './routes/authRoute.js';
import copilotRouter from './routes/copilotRoute.js';
import { errorResponse } from './utils/responseHandler.js'; 

const app = express();
const PORT = CONFIG.API_PORT || 3000;

/**
 * ========================
 * Middleware Configuration
 * ========================
 */

// Parse incoming JSON and URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use(requestLogger);

// JWT logging middleware
app.use(jwtLogger);

/**
 * ========================
 * Swagger Setup
 * ========================
 */
const swaggerDocument = YAML.load(path.resolve('swagger/swagger.yaml'));
swaggerDocument.servers = [
  {
    url: `${CONFIG.BASE_URL || `http://localhost:${PORT}`}/api`,
  },
];

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * ========================
 * Routes
 * ========================
 */
app.use('/api/auth', authRouter);
app.use('/api/copilot', copilotRouter);

/**
 * ========================
 * Error Handling
 * ========================
 */

// 404 Handler for unmatched routes
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err);
  return errorResponse(res, err, 500, 'Internal Server Error');
});

/**
 * ========================
 * Server Bootstrap
 * ========================
 */
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

export default app; // optional, useful for testing
