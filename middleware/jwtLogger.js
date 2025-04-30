import jwt from 'jsonwebtoken';
import { logger } from '../config/logger.js';  // Assuming you have logger set up

const jwtLogger = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]; // Assuming Bearer token format
        try {
            const decodedToken = jwt.decode(token);
            const formattedLogger = {
                "JWT Token Decoded": decodedToken,
                "Body data": req.body,
                "Params": req.params
            };
            logger.info(`JWT Token Decoded: ${JSON.stringify(formattedLogger, null, 2)}`);
        } catch (err) {
            logger.error('Error decoding JWT token', err);
        }
    }
    next();
};

export default jwtLogger;
