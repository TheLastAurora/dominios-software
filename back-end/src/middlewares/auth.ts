import { NextFunction, Request, Response } from "express";
import { Credentials } from "../models/user.model";
import * as jwt from "jsonwebtoken";
import { Decoded } from "../models/decoded.model";

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
                res.status(500).json({message: 'Token não enviado'});
            else
                jwt.verify(token, `${process.env.API_SECRET}`, (error, decoded)=>{
                    if(error)
                        res.status(403).json({message: 'Não autenticado'});
                    else
                        next();
                });
        } catch (error) {
            res.status(500).json({message: 'Erro ao processar requisição'});
        }
    }

    public decode(token: string): jwt.JwtPayload | String | undefined | Decoded {
        let response: jwt.JwtPayload | String | undefined | Decoded = '';
        jwt.verify(token, `${process.env.API_SECRET}`, (error, decoded)=>{
            response = decoded;
        });
        return response;
    }

}

export default new Auth();