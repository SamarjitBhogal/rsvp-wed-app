import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export function authToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null)
		return res.status(401).send({ message: 'Inappropriate request. Bad header format or unauthenticated.' });
	
	jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
		if (err) {
			console.log(err);
			return res.status(403).send({ message: 'Token invalid. User request is unauthorized. User must login.' });
		}
		
        req.user = user;
        return next();
	});
}
