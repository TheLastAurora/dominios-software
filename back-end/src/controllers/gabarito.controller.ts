import { Request, Response } from "express";
import prisma from "./../database/prisma";
import { Gabarito } from "../models/gabarito.model";

class GabaritoController {

    public async create(req: Request, res: Response): Promise<Response>{
        try{
            const gabarito: Gabarito = req.body;
            const newGabarito = await prisma.gabarito.create({
                data: gabarito
            });
            await prisma.concurso.update({
                where: {
                    id: gabarito.concursoId
                },
                data: {
                    gabaritos: {
                        connect: {
                            id: newGabarito.id
                        },
                    },
                },
            });
            await prisma.user.update({
                where: {
                    id: 2
                },
                data: {
                    gabarito: {
                        connect: {
                            id: newGabarito.id,
                        },
                    },
                },
            });
            return res.status(201).json({message: 'Gabarito created'});
        } catch(error) {
            return res.status(500).json({message: 'Error'});
        }
    }

    public async read(req: Request, res: Response): Promise<Response>{
        try{
            const id: number = Number(req.params.id);
            const gabarito = await prisma.gabarito.findUnique({
                where: {
                    id: id
                },
            });
            if(!gabarito)
                return res.status(401).json({message: "Gabarito not found"});
            return res.status(200).json(gabarito);
        } catch(error) {
            return res.status(500).json({message: 'Error'});
        }
    }

    public async update(req: Request, res: Response): Promise<Response>{
        try{
            const id: number = Number(req.params.id);
            const gabarito = prisma.gabarito.findUnique({
                where: {
                    id: id
                },
            });
            if(!gabarito)
                return res.status(401).json({message: "Gabarito not found"});
            const gabaritoData: Gabarito = req.body;
            await prisma.gabarito.update({
                where: {
                    id: id,
                },
                data: gabaritoData
            });
            return res.status(200).json({message: "Gabarito updated"});
        } catch(error) {
            return res.status(500).json({message: 'Error'});
        }
    }

    public async delete(req: Request, res: Response): Promise<Response>{
        try{
            const id: number = Number(req.params.id);
            const gabarito = await prisma.gabarito.findUnique({
                where: {
                    id: id,
                },
            });
            if(!gabarito)
                return res.status(401).json({message: "Gabarito not found"});
            await prisma.gabarito.delete({
                where: {
                    id: id,
                },
            });
            return res.status(200).json({message: 'Gabarito deleted'});
        } catch(error) {
            return res.status(500).json({message: 'Error'});
        }
    }

}

export default new GabaritoController();