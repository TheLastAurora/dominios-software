export interface GabaritoAttrs {
    tipo: string,
    respostas?: JSON
}

export interface Gabarito extends GabaritoAttrs {
    id?: number,
    userId: number,
    concursoId: number,
    createdAt?: Date,
    updatedAt?: Date
}