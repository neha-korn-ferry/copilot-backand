import express, { urlencoded } from 'express';
import { CONFIG } from './config/config.js';
import authRouter from './routes/authRoute.js';
import privateRouter from './routes/privateRoute.js';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from './swagger/swaggerOptions.js';
import swaggerUi from 'swagger-ui-express';
import { requestLogger } from './config/logger.js';
import jwtLogger from './middleware/jwtLogger.js';

const app = express();
const PORT = CONFIG.API_PORT;

// Body configuration
app.use(express.json());
app.use(urlencoded({ extended: true }));

// Use request logger middleware for logging all incoming requests
app.use(requestLogger);

// Middleware to unpack and log JWT token
app.use(jwtLogger);

// Swagger setup
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route setup
app.use('/api/auth', authRouter);
app.use('/api', privateRouter);

// Error handling for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// General error handler (Internal Server Error)
app.use((err, req, res, next) => {
    errorResponse(res, err);
});

// Server setup
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
