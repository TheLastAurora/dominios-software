import { Request, Response } from "express";
import prisma from "../database/prisma";
import { Concurso } from "../models/concurso.model";
import { Gabarito } from "../models/gabarito.model";
import { Candidato } from '../models/candidato.model';

class ConcursoController {

    public async create(req: Request, res: Response): Promise<Response>{
        try {
            const concurso: Concurso = req.body;
            concurso.homologacao = new Date(concurso.homologacao);
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

    public async readAll(req: Request, res: Response): Promise<Response>{
        try{
            const concursos: Concurso[] = await prisma.concurso.findMany();
            return res.status(200).json(concursos);
        } catch(error) {
            return res.status(500).json({message: 'Error'});
        }
    }

    public async readConcursoCandidatos(req: Request, res: Response): Promise<Response>{
        try{
            const id: number = Number(req.params.id);
            const candidatos: Candidato[] = await prisma.candidato.findMany({
                where: {
                    concursoID: id,
                },
            });
            return res.status(200).json(candidatos);
        } catch(error) {
            return res.status(500).json({message: 'Error'});
        }
    }

    public async readConcursoGabaritos(req: Request, res: Response): Promise<Response>{
        try{
            const id: number = Number(req.params.id);
            const gabaritos = await prisma.gabarito.findMany({
                where: {
                    concursoId: id,
                },
            });
            return res.status(200).json(gabaritos);
        } catch(error) {
            return res.status(500).json({message: 'Error'});
        }
    }

    public async readConcludedConcursos(req: Request, res: Response): Promise<Response>{
        try {
            const concursos = await prisma.concurso.findMany({
                where: {
                    candidatos: {
                        every: {
                            nota: 1
                        }
                    }
                }
            })
            return res.status(200).json(concursos);
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
            concursoData.homologacao = new Date(concursoData.homologacao);
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
            return res.status(200).json({message: 'Concurso deleted'});
        } catch(error) {
            return res.status(500).json({message: 'Error'});
        }
        
    }

}

export default new ConcursoController();