import dotenv from 'dotenv'
dotenv.config();
export const CONFIG = {
    JWT_SECRET_KEY: process.env.JWT_SECRET,
    API_PORT: process.env.PORT
};
