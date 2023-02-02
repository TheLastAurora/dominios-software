import { Prisma } from '@prisma/client';
import { User } from './user.model';

export interface Gabarito {
    id?: number,
    tipo: string,
    respostas: Prisma.JsonValue,
    autor?: User,
    concursoId: number,
    createdAt?: Date,
    updatedAt?: Date
}