import { Genero, Uf } from './../../node_modules/.prisma/client/index.d';

export interface Candidato {
    id?: number,
    nome: string,
    cpf: string,
    genero: Genero,
    nome_mae: string,
    nome_pai: string,
    data_nascimento: Date,
    rg: string,
    data_expedicao: Date,
    logradouro: string,
    numero: string,
    complemento: string,
    bairro: string,
    cep: string,
    cod_municipio: string,
    uf: Uf,
    email: string,
    telefone: string,
    nota: number | null,
    concursoID: number,
    createdAt?: Date,
    updatedAt?: Date
}