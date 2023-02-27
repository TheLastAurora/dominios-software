import prisma from './../database/prisma';
import { Request, Response } from "express";
import { Credentials, User } from "../models/user.model";
import encrypt from "../functions/encrypt";
import auth from '../middlewares/auth';
import { Decoded } from '../models/decoded.model';
import * as jwt from "jsonwebtoken";

class UserController {

    public async create(req: Request, res: Response): Promise<Response>{
        try {
            const user: User = req.body;
            const userExists: any = await prisma.user.findUnique({
                where: {
                    login: user.login,
                },
            });
            if(userExists)
                return res.status(401).json({message: 'Já existe usuário com o login cadastrado'});
            user.senha = await encrypt.hash(user.senha);
            await prisma.user.create({
                data: user,
            });
            return res.status(201).json({message: 'Usuário criado'});
        } catch(error) {
            return res.status(500).send({message: 'Erro ao processar requisição'});
        }
    }

    public async read(req: Request, res: Response): Promise<Response>{
        try{
            const id: number = Number(req.params.id);
            const user = await prisma.user.findUnique({
                where:{
                    id: id,
                },
            });
            if(!user)
                return res.status(401).json({message: 'Usuário não encontrado'});
            user.senha = '';
            return res.status(200).json(user);
        } catch(error) {
            return res.status(500).json({message: 'Erro ao processar requisição'});
        }
    }

    public async update(req: Request, res: Response): Promise<Response>{
        try{
            const id: number = Number(req.params.id);
            const user: any = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if(!user)
                return res.status(401).json({message: 'Usuário não encontrado'});
            const userData: User = req.body;
            const userWithLogin = await prisma.user.findUnique({
                where: {
                    login: userData.login,
                },
            });
            if(userWithLogin && userWithLogin.login != userData.login)
                return res.status(401).json({message: 'Já existe usuário com o login cadastrado'});
            userData.senha = await encrypt.hash(userData.senha);
            await prisma.user.update({
                where: {
                    id: id
                },
                data: userData,
            });
            return res.status(200).json({message: 'Usuário deletado'});
        } catch(error) {
            return res.status(500).json({message: 'Erro ao processar requisição'});
        }
    }

    public async delete(req: Request, res: Response): Promise<Response>{
        try {
            const id: number = Number(req.params.id);
            const user: any = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if(!user)
                return res.status(401).json({message: 'Usuário não encontrado'});
            await prisma.user.delete({
                where: {
                    id: id
                },
            });
            return res.status(200).json({message: 'Usuário deletado'});
        } catch(error) {
            return res.status(500).json({message: 'Erro ao processar requisição'});
        }
    }

    public async authenticate(req: Request, res: Response): Promise<Response>{
        try{
            const credentials: Credentials = req.body;
            const user = await prisma.user.findUnique({
                where: {
                    login: credentials.login,
                },
            });
            if(!user)
                return res.status(400).json({message: "Usuário não encontrado"});
            if(await encrypt.compare(credentials.senha, user.senha)){
                const token = auth.sign(credentials);
                return res.status(200).json(token);
            }
            else
                return res.status(403).json({message: 'Credenciais inválidas'});
        } catch(error) {
            return res.status(500).json({message: 'Erro ao processar requisição'});
        }
    }

    public async getCurrentUser(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.body;
            const decoded: jwt.JwtPayload | String | undefined | Decoded = auth.decode(token.token) as Decoded;
            decoded.credentials.senha = '';
            return res.status(200).json(decoded);
        } catch(error) {
            return res.status(500).json({message: 'Erro ao processar requisição'});
        }
    }

}

export default new UserController();