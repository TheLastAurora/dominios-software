import { Request, Response } from "express";
import prisma from "../database/prisma";
import { Concurso } from "../models/concurso.model";

class ConcursoController {

    public async create(req: Request, res: Response): Promise<Response>{
        try {
            const concurso: Concurso = req.body;
            await prisma.concurso.create({
                data: concurso
            });
            return res.status(201).json({message: 'Concurso created'});
        } catch(error) {
            return res.status(500).json({message: 'Error'});
        }
    }

    public async read(req: Request, res: Response): Promise<Response>{
        try {
            const id: number = Number(req.params.id);
            const concurso = await prisma.concurso.findUnique({
                where: {
                    id: id,
                },
            });
            if(!concurso)
                return res.status(400).json({message: 'Concurso not found'});
            return res.status(200).json(concurso);
        } catch(error) {
            return res.status(500).json({message: 'Error'});
        }
        
    }

    public async update(req: Request, res: Response): Promise<Response>{
        try {
            const id: number = Number(req.params.id);
            const concurso = await prisma.concurso.findUnique({
                where: {
                    id: id,
                },
            });
            if(!concurso)
                return res.status(400).json({message: 'Concurso not found'});
            const concursoData: Concurso = req.body;
            await prisma.concurso.update({
                where: {
                    id: id,
                },
                data: concursoData
            });
            return res.status(201).json({message: 'Concurso updated'});
        } catch(error) {
            return res.status(500).json({message: 'Error'});
        }
        
    }

    public async delete(req: Request, res: Response): Promise<Response>{
        try {
            const id: number = Number(req.params.id);
            const concurso = await prisma.concurso.findUnique({
                where: {
                    id: id,
                },
            });
            if(!concurso)
                return res.status(400).json({message: 'Concurso not found'});
            await prisma.concurso.delete({
                where: {
                    id: id,
                },
            });
            return res.status(201).json({message: 'Concurso updated'});
        } catch(error) {
            return res.status(500).json({message: 'Error'});
        }
        
    }

}

export default new ConcursoController();