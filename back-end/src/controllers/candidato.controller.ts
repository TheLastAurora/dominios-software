import { Request, Response } from "express";
import prisma from "../database/prisma";
import { Candidato } from "../models/candidato.model";

class CandidatoController {

    public async create(req: Request, res: Response): Promise<Response>{
        try {
            const candidato: Candidato = req.body;
            const existByTaxId: any = await prisma.candidato.findUnique({
                where: {
                    taxId: candidato.taxId
                },
            });
            if(existByTaxId)
                return res.status(400).json({message: 'Candidato Tax ID already registered'});
            const existByDocumentId: any = await prisma.candidato.findUnique({
                where: {
                    documentId: candidato.documentId
                },
            });
            if(existByDocumentId)
                return res.status(400).json({message: 'Candidato Document ID already registered'});
            const address = await prisma.address.create({
                data: candidato.address
            });
            await prisma.candidato.create({
                data: {
                    name: candidato.name,
                    socialName: candidato.socialName,
                    taxId: candidato.taxId,
                    documentId: candidato.documentId,
                    issuedAt: candidato.documentId,
                    gender: candidato.gender,
                    mothersName: candidato.mothersName,
                    fathersName: candidato.fathersName,
                    birthDate: candidato.birthDate,
                    birthPlace: candidato.birthPlace,
                    email: candidato.email,
                    telephone: {
                        createMany: {
                            data: candidato.telephone
                        },
                    },
                    address: {
                        connect: {
                            id: address.id
                        }
                    }
                }
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
                    taxId: candidatoData.taxId
                },
            });
            if(existByTaxId && existByTaxId.taxId != candidatoData.taxId)
                return res.status(400).json({message: 'Candidato Tax ID already registered'});
            const existByDocumentId: any = await prisma.candidato.findUnique({
                where: {
                    documentId: candidatoData.documentId
                },
            });
            if(existByDocumentId && existByDocumentId.documentId != candidatoData.documentId)
                return res.status(400).json({message: 'Candidato Document ID already registered'});
            await prisma.candidato.update({
                where: {
                    id: id,
                },
                data: {
                    name: candidatoData.name,
                    socialName: candidatoData.socialName,
                    taxId: candidatoData.taxId,
                    documentId: candidatoData.documentId,
                    issuedAt: candidatoData.documentId,
                    gender: candidatoData.gender,
                    mothersName: candidatoData.mothersName,
                    fathersName: candidatoData.fathersName,
                    birthDate: candidatoData.birthDate,
                    birthPlace: candidatoData.birthPlace,
                    email: candidatoData.email
                }
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