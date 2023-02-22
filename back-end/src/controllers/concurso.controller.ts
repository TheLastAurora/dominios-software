import { Request, Response } from "express";
import prisma from "../database/prisma";
import { Concurso } from "../models/concurso.model";
import { Candidato } from '../models/candidato.model';
import decompress from 'decompress';
import {PythonShell} from 'python-shell';
import path from 'path';

class ConcursoController {

    public async create(req: Request, res: Response): Promise<Response>{
        try {
            const concurso: Concurso = req.body;
            concurso.homologacao = new Date(concurso.homologacao);
            await prisma.concurso.create({
                data: concurso
            });
            return res.status(201).json({message: 'Concurso criado'});
        } catch(error) {
            return res.status(500).json({message: 'Erro ao processar requisição'});
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
                return res.status(400).json({message: 'Concurso não encontrado'});
            return res.status(200).json(concurso);
        } catch(error) {
            return res.status(500).json({message: 'Erro ao processar requisição'});
        }
        
    }

    public async readAll(req: Request, res: Response): Promise<Response>{
        try{
            const concursos: Concurso[] = await prisma.concurso.findMany();
            return res.status(200).json(concursos);
        } catch(error) {
            return res.status(500).json({message: 'Erro ao processar requisição'});
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
            return res.status(500).json({message: 'Erro ao processar requisição'});
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
            return res.status(500).json({message: 'Erro ao processar requisição'});
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
            return res.status(500).json({message: 'Erro ao processar requisição'});
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
                return res.status(400).json({message: 'Concurso não encontrado'});
            const concursoData: Concurso = req.body;
            concursoData.homologacao = new Date(concursoData.homologacao);
            await prisma.concurso.update({
                where: {
                    id: id,
                },
                data: concursoData
            });
            return res.status(201).json({message: 'Concurso atualizado'});
        } catch(error) {
            return res.status(500).json({message: 'Erro ao processar requisição'});
        }
        
    }

    public async insertFile(req: Request, res: Response): Promise<Response>{
        try {
            const file = req.file;
            if(!file)
                return res.status(400).json({message: 'Arquivo não recebido'});
            await decompress(path.resolve(`./../eval-app/${file.filename}`), path.resolve('./../eval-app/cartoes'));
            PythonShell.run('../../dominios-software/eval-app/src/main.py', {args: ['--inst', '50']});
            return res.status(201).json(file);
        } catch(error) {
            return res.status(500).json(error);
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
                return res.status(400).json({message: 'Concurso não encontrado'});
            await prisma.concurso.delete({
                where: {
                    id: id,
                },
            });
            return res.status(200).json({message: 'Concurso deletado'});
        } catch(error) {
            return res.status(500).json({message: 'Erro ao processar requisição'});
        }
        
    }

}

export default new ConcursoController();