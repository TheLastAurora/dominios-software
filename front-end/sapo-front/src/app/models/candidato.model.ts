enum Genero {
    M,
    F
  }
  
  enum Uf {
    AC,
    AL,
    AP,
    AM,
    BA,
    CE,
    DF,
    ES,
    GO,
    MA,
    MT,
    MS,
    MG,
    PA,
    PB,
    PR,
    PE,
    PI,
    RJ,
    RN,
    RS,
    RO,
    RR,
    SC,
    SP,
    SE,
    TO,
    SN
  }

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
    nota: number,
    concursoID: number,
    createdAt?: Date,
    updatedAt?: Date
}