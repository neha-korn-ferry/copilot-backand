import { logger } from '../config/logger.js';

// Success Response Handler (for any successful response)
export const successResponse = (res, status = 200, message = 'Success', data = null, req) => {
    res.status(status).json({
        message,
        data,
        headers_sent: [
            { authorization: req.headers['authorization'] || 'not provided' },
            { 'content-type': req.get('Content-Type') || 'not provided' }
        ]
    });
};

// Error Response Handler (for catching errors and sending error responses)
export const errorResponse = (res, error, status = 500) => {
    logger.error({
        message: error.message || 'An error occurred',
        stack: error.stack,
        requestMethod: res.req.method,
        requestUrl: res.req.originalUrl,
        headers: res.req.headers,
        body: res.req.body,
        timestamp: new Date().toISOString(),
    });

    res.status(status).json({
        message: error.message || 'Internal Server Error',
        error: error.message || 'Internal Server Error',
    });
};