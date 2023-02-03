import { Prisma } from '@prisma/client';
import { User } from './user.model';

export interface Gabarito {
    id?: number,
    tipo?: string | null,
    respostas?: Prisma.JsonObject,
    userId: number,
    concursoId: number,
    createdAt?: Date,
    updatedAt?: Date
}