import {InspecaoApi} from "../@types/inspecao"
import { api } from "../services/api";


export async function buscarInspecoes(): Promise<InspecaoApi[]> {
    const resposta = await api.get<InspecaoApi[]>("/Inspecao");
    return resposta.data;
}