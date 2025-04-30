import jwt from 'jsonwebtoken'
import { CONFIG } from '../config/config.js';
import { errorResponse } from '../utils/responseHandler.js';
export const authenticateToken = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            errorResponse(res, { message: 'Token not available' }, 403)
        }

        jwt.verify(token, CONFIG.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                errorResponse(res, { message: 'Token is invalid' }, 403)
            }
            req.user = user;
            next()
        })
    }
    catch (err) {
        errorResponse(res, err, 500)
    }
}