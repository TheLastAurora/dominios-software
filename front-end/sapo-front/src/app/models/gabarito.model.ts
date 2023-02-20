export interface Gabarito {
    id?: number,
    tipo: string,
    respostas?: JSON,
    userId: number,
    concursoId: number,
    createdAt?: Date,
    updatedAt?: Date
}