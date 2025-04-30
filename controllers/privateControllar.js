import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const helloReturn = (req, res) => {
    try {
        successResponse(res, 200, 'Hello World',null,req);
    } catch (error) {
        errorResponse(res, error, 500);
    }
};
