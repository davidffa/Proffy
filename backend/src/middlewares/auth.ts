import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedParams {
    id: number;
}

function auth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) 
        return res.status(401).send({ error: 'No token provided' });

    const parts = authHeader.split(' ');

    if (parts.length !== 2)
        return res.status(401).send({ error: 'Token error' });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malformed' });

    jwt.verify(token, process.env.secret as string, (err, decoded) => {
        if (err)
            return res.status(401).send({ error: 'Invalid token' });

        req.userId = (decoded as DecodedParams).id;

        return next();
    });
}

export default auth;