import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export async function signJWT(user) {
    const accessToken = jwt.sign(
        user,
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRE_TIME }
    );
    return accessToken;
}