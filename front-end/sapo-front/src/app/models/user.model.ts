export interface Credentials {
    login: string,
    senha: string,
}

export interface User extends Credentials {
    id?: number,
    nome: string,
    createdAt?: Date,
    updatedAt?: Date
}