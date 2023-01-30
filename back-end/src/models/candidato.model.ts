import { Gender, UFs } from './../../node_modules/.prisma/client/index.d';

interface PhoneNumber {
    id?: number,
    telephone: string,
    createdAt?: Date,
    updatedAt?: Date
}

interface Address {
    id?: number,
    cep: string,
    uf: UFs,
    city: string,
    neighborhood: string,
    street: string,
    number: string,
    complement: string,
    createdAt?: Date,
    updatedAt?: Date
}

export interface Candidato {
    id?: number,
    name: string,
    socialName: string,
    taxId: string,
    documentId: string,
    issuedAt: Date,
    gender: Gender,
    mothersName: string,
    fathersName: string,
    birthDate: Date,
    birthPlace: string,
    email: string,
    telephone: PhoneNumber[],
    address: Address,
    createdAt?: Date,
    updatedAt?: Date
}