import { NextFunction, Request, Response } from "express";
import { Credentials } from "../models/user.model";
import * as jwt from "jsonwebtoken";

class Auth {

    public sign(credentials: Credentials): string{
        return jwt.sign({
            credentials
        }, `${process.env.API_SECRET}`, {expiresIn: '1h'});
    }

    public verify(req: Request, res: Response, next: NextFunction){
        try {
            const token = req.headers.authorization?.replace('Bearer ', '');
            if(!token)
                res.status(500).json({message: 'Token missing'});
            else
                jwt.verify(token, `${process.env.API_SECRET}`, (error, decoded)=>{
                    if(error)
                        res.status(403).json({message: 'unauth'});
                    else
                        next();
                });
        } catch (error) {
            res.status(500).json({message: 'Error'});
        }
    }

    public decode(token: string){
        let response: jwt.JwtPayload | String | undefined = '';
        jwt.verify(token, `${process.env.API_SECRET}`, (error, decoded)=> {
            response = decoded;
        });
        return response;
    }

}

export default new Auth();