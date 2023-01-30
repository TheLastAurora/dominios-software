import prisma from "./../database/prisma";
import { Request, Response } from "express";
import { User } from "../models/user.model";
import encrypt from "../functions/encrypt";

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
                return res.status(401).json({message: 'User login already taken'});
            user.password = encrypt.hash(user.password);
            await prisma.user.create({
                data: user,
            });
            return res.status(201).json({message: 'User created'});
        } catch(error) {
            return res.status(400).send({message: 'Bad request'});
        }
    }

    public async read(req: Request, res: Response): Promise<Response>{
        try{
            const id: number = Number(req.params.id);
            if(!id)
                return res.status(400).json({message: 'User ID not provided'});
            const user = await prisma.user.findUnique({
                where:{
                    id: id,
                },
            });
            if(!user)
                return res.status(401).json({message: 'User not found'});
            return res.status(200).json(user);
        } catch(error) {
            return res.status(500).json({message: 'Error'});
        }
    }

    public async update(req: Request, res: Response): Promise<Response>{
        try{
            const id: number = Number(req.params.id);
            if(!id)
                return res.status(400).json({message: 'User ID not provided'});
            const user: any = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if(!user)
                return res.status(401).json({message: 'User not found'});
            const userData: User = req.body;
            const userWithLogin = await prisma.user.findUnique({
                where: {
                    login: userData.login,
                },
            });
            if(userWithLogin)
                return res.status(401).json({message: 'User login already taken'});
            userData.password = encrypt.hash(userData.password);
            await prisma.user.update({
                where: {
                    id: id
                },
                data: userData,
            });
            return res.status(200).json({message: 'User updated'});
        } catch(error) {
            return res.status(500).json({message: 'Error'});
        }
    }

    public async delete(req: Request, res: Response): Promise<Response>{
        try {
            const id: number = Number(req.params.id);
            if(!id)
                return res.status(400).json({message: 'User ID not provided'});
            const user: any = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if(!user)
                return res.status(401).json({message: 'User not found'});
            await prisma.user.delete({
                where: {
                    id: id
                },
            });
            return res.status(200).json({message: 'User deleted'});
        } catch(error) {
            return res.status(500).json({message: 'Error'});
        }
    }

}

export default new UserController();