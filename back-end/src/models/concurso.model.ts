import { Candidato } from './candidato.model';
import { User } from './user.model';
export interface Gabarito {
    id?: number,
    tipo: string,
    respostas: JSON,
    autor: User,
    createdAt?: Date,
    updatedAt?: Date
}

export interface Concurso {
    id?: number,
    nome: string,
    cargo: string,
    vagas_ac: number,
    vagas_pd: number,
    homologacao: Date,
    candidato?: Candidato[],
    gabaritos?: Gabarito[],
    createdAt?: Date,
    updatedAt?: Date
}