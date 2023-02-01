import { Request, Response } from "express";
import prisma from "../database/prisma";
import { Candidato } from "../models/candidato.model";

class CandidatoController {

    public async create(req: Request, res: Response): Promise<Response>{
        try {
            const candidato: Candidato = req.body;
            const existByTaxId: any = await prisma.candidato.findUnique({
                where: {
                    cpf: candidato.cpf,
                },
            });
            if(existByTaxId)
                return res.status(400).json({message: 'Candidato Tax ID already registered'});
            const existByDocumentId: any = await prisma.candidato.findUnique({
                where: {
                    rg: candidato.rg,
                },
            });
            if(existByDocumentId)
                return res.status(400).json({message: 'Candidato Document ID already registered'});
            await prisma.candidato.create({
                data: candidato
            });
            return res.status(201).json({message: 'Candidato created'});
        } catch (error) {
            return res.status(500).json({message: 'Error'});
        }
    }

    public async read(req: Request, res: Response): Promise<Response>{
        try {
            const id: number = Number(req.params.id);
            const candidato = await prisma.candidato.findUnique({
                where: {
                    id: id,
                },
            });
            if(!candidato)
                return res.status(400).json({message: 'Candidato not found'});
            return res.status(200).json(candidato);
        } catch (error) {
            return res.status(500).json({message: 'Error'});
        }
    }

    public async update(req: Request, res: Response): Promise<Response>{
        try {
            const id: number = Number(req.params.id);
            const candidato = await prisma.candidato.findUnique({
                where: {
                    id: id,
                },
            });
            if(!candidato)
                return res.status(400).json({message: 'User not found'});
            const candidatoData: Candidato = req.body;
            const existByTaxId: any = await prisma.candidato.findUnique({
                where: {
                    cpf: candidatoData.cpf,
                },
            });
            if(existByTaxId && existByTaxId.cpf != candidatoData.cpf)
                return res.status(400).json({message: 'Candidato Tax ID already registered'});
            const existByDocumentId: any = await prisma.candidato.findUnique({
                where: {
                    rg: candidatoData.rg,
                },
            });
            if(existByDocumentId && existByDocumentId.rg != candidatoData.rg)
                return res.status(400).json({message: 'Candidato Document ID already registered'});
            await prisma.candidato.update({
                where: {
                    id: id,
                },
                data: candidatoData
            });
            return res.status(200).json({message: 'Candidato updated'});
        } catch (error) {
            return res.status(500).json({message: 'Error'});
        }
    }

    public async delete(req: Request, res: Response): Promise<Response>{
        try {
            const id: number = Number(req.params.id);
            const candidato = await prisma.candidato.findUnique({
                where: {
                    id: id,
                },
            });
            if(!candidato)
                return  res.status(400).json({message: 'Candidato not found'});
            await prisma.candidato.delete({
                where: {
                    id: id,
                },
            });
            return res.status(200).json({message: 'Candidato deleted'});
        } catch (error) {
            return res.status(500).json({message: 'Error'});
        }
    }

}

export default new CandidatoController();