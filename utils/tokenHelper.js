import jwt from 'jsonwebtoken';
import { CONFIG } from '../config/config.js';

export const createToken = (payload) => {
  if (!payload) {
    throw new Error('Payload is required to generate token.');
  }

  const token = jwt.sign(payload, CONFIG.JWT_SECRET_KEY, {
    expiresIn: '1h',
    issuer: 'copilot-backend'
  });

  return token;
};
