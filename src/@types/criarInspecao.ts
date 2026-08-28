export interface Inspecao {
    inspecaoID: number,
    equipamento: string,
    localizacao: string,
    cliente: string,
    statusInspecao: boolean,
    statusTexto: string,
    dataCriacao: string
}

export interface ObservacaoUpload {
    uri: string,
    name?: string,
    mimeType: string
}

export interface AdicionarInspecao {
    equipamento: string,
    localizacao: string,
    cliente: string,
    statusInspecao: boolean,
    observacao: ObservacaoUpload
}