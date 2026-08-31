import { Inspecao } from "../@types/inspecao";
import { api } from "./api";

export const inspecaoService = {
  async buscarPorId(id: number): Promise<Inspecao> {
    const resposta = await api.get<Inspecao>(`Inspecao/${id}`);
    return resposta.data;
  },

  obterUrlAudio(id: number) {
    const baseURL = api.defaults.baseURL ?? "";
    const separador = baseURL.endsWith("/") ? "" : "/";

    return `${baseURL}${separador}Inspecao/${id}/audio`;
  },
};