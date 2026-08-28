import { AdicionarInspecao, Inspecao } from "../@types/criarInspecao"
import { api } from "./api";

export const inspecaoService = {

    async adicionar(dados: AdicionarInspecao): Promise<Inspecao> {
        const formData = new FormData();
        formData.append('equipamento', dados.equipamento)
        formData.append('localizacao', dados.localizacao)
        formData.append('cliente', dados.cliente)
        formData.append('statusInspecao', String(dados.statusInspecao))

        if (dados.observacao) {
            const uri = dados.observacao.uri;
            const fileName = dados.observacao.name || `audio_${Date.now()}.m4a`
            const match = /\.(\w+)$/.exec(fileName);
            const mimeType = dados.observacao.mimeType || (match ? `audio/${match[1].toLowerCase()}` : 'audio/m4a')

            formData.append(`observacao`, {
                uri,
                name: fileName,
                type: mimeType
            } as any)
        }

        const retorno = await api.post<Inspecao>("Inspecao", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return retorno.data;

    }
}