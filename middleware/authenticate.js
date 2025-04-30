// authenticate.js

import jwt from 'jsonwebtoken'
import { CONFIG } from '../config/config.js';
import { errorResponse } from '../utils/responseHandler.js';
export const CheckAuthenticate = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            errorResponse(res, { message: 'Token not available' }, 403)
            // return res.status(403).json({ message: 'Token not available' });
        }

        jwt.verify(token, CONFIG.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                errorResponse(res, { message: 'Token is invalid' }, 403)
                // return res.status(403).json({ message: 'Token is invalid' })
            }
            req.user = user;
            next()
        })
    }
    catch (err) {
        errorResponse(res, err, 500)
        // return res.status(500).json({ message: 'Internal server error', error: err })
    }
}

