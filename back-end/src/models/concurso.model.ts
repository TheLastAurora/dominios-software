export interface Gabarito {
    id?: number,
    type: string,
    answers: JSON,
    createdAt?: Date,
    updatedAt?: Date
}

export interface Concurso {
    id?: number,
    name: string,
    role: string,
    vacancies: number,
    gabaritos?: Gabarito,
    concludedAt: Date,
    createdAt?: Date,
    updatedAt?: Date
}