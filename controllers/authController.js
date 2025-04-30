import { createToken } from '../utils/tokenHelper.js'; 
import { successResponse, errorResponse } from '../utils/responseHandler.js'; 

export const generateToken = (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return errorResponse(res, new Error('Username and password are required.'), 400);
    }

    const payload = {
      username,
      role: 'user'
    };

    const token = createToken(payload);

    // Use the success response handler to return the success message and token
    return successResponse(res, 200, 'Token generated successfully', { token },req);

  } catch (error) {
    console.error('Error in generateToken:', error.message);
    // Use the error response handler to log the error and send the response
    return errorResponse(res, error, 500);
  }
};
