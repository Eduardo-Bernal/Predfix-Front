import {api} from "./api";

export async function listarInspecoes() {
    try {
        const response = await api.get("Inspecao");
        return response.data;
    } catch (error: any) {
        console.log("DEBUG ERRO COMPLETO:", error.toJSON ? error.toJSON() : error);
        throw error;
    }
}