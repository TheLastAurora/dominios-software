import { Request, Response } from "express";
import prisma from "../database/prisma";
import { Candidato } from "../models/candidato.model";


class CandidatoController {

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const candidato: Candidato = req.body;
            const existByTaxId: any = await prisma.candidato.findUnique({
                where: {
                    cpf: candidato.cpf,
                },
            });
            if (existByTaxId)
                return res.status(400).json({ message: 'Já existe um candidato com o CPF cadastrado' });
            const existByDocumentId: any = await prisma.candidato.findUnique({
                where: {
                    rg: candidato.rg,
                },
            });
            if (existByDocumentId)
                return res.status(400).json({ message: 'Já existe um candidato com o RG cadastrado' });
            candidato.data_nascimento = new Date(candidato.data_nascimento);
            candidato.data_expedicao = new Date(candidato.data_expedicao);
            const newCandidato = await prisma.candidato.create({
                data: candidato
            });
            await prisma.concurso.update({
                where: {
                    id: candidato.concursoID
                },
                data: {
                    candidatos: {
                        connect: {
                            id: newCandidato.id,
                        },
                    },
                },
            })
            return res.status(201).json({ message: 'Candidato criado com sucesso' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao processar requisição' });
        }
    }

    public async read(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = Number(req.params.id);
            const candidato = await prisma.candidato.findUnique({
                where: {
                    id: id,
                },
            });
            if (!candidato)
                return res.status(400).json({ message: 'Candidato não encontrado' });
            return res.status(200).json(candidato);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao processar requisição' });
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = Number(req.params.id);
            const candidato = await prisma.candidato.findUnique({
                where: {
                    id: id,
                },
            });
            if (!candidato)
                return res.status(400).json({ message: 'Candidato não encontrado' });
            const candidatoData: Candidato = req.body;
            const existByTaxId: any = await prisma.candidato.findUnique({
                where: {
                    cpf: candidatoData.cpf,
                },
            });
            if (existByTaxId && existByTaxId.cpf != candidatoData.cpf)
                return res.status(400).json({ message: 'Já existe um candidato com o CPF cadastrado' });
            const existByDocumentId: any = await prisma.candidato.findUnique({
                where: {
                    rg: candidatoData.rg,
                },
            });
            if (existByDocumentId && existByDocumentId.rg != candidatoData.rg)
                return res.status(400).json({ message: 'Já existe um candidato com o RG cadastrado' });
            candidatoData.data_nascimento = new Date(candidato.data_nascimento);
            candidatoData.data_expedicao = new Date(candidato.data_expedicao);
            await prisma.candidato.update({
                where: {
                    id: id,
                },
                data: candidatoData
            });
            return res.status(200).json({ message: 'Candidato atualizado' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao processar requisição' });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = Number(req.params.id);
            const candidato = await prisma.candidato.findUnique({
                where: {
                    id: id,
                },
            });
            if (!candidato)
                return res.status(400).json({ message: 'Candidato não encontrado' });
            await prisma.candidato.delete({
                where: {
                    id: id,
                },
            });
            return res.status(200).json({ message: 'Candidato deletado' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao processar requisição' });
        }
    }

}

export default new CandidatoController();