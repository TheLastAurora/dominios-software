import { Candidato } from './candidato.model';

export interface Concurso {
    id?: number,
    nome: string,
    cargo: string,
    vagas_ac: number,
    vagas_pd: number,
    homologacao: Date,
    createdAt?: Date,
    updatedAt?: Date
}