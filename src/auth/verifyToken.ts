import { Response, NextFunction} from 'express';
import * as express from 'express';
import { verify } from 'jsonwebtoken';

export interface IPayLoad {
    id: number
}

interface Request extends express.Request {
    id?: number;
}


export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization'];
        const authToken = token && token.split(' ')[1];
        if (!authToken) return res.status(401).send({ auth: false, message: 'no token provided' });

        const decoded = verify(authToken,'IMAGINARYTOKEN',) as IPayLoad;
        req.id = decoded.id;
        next();
    } catch (e) {
        res.status(401).send("Invalid token");
    }
}