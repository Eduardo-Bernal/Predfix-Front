import { useState } from "react";
import { AdicionarInspecao, Inspecao } from "../@types/criarInspecao";
import { Alert } from "react-native";
import { inspecaoService } from "../services/inspecaoService";

export function useInspecao() {
    const [inspecao, setInspecao] = useState<Inspecao[]>([]);

    async function adicionarInspecao(dados: AdicionarInspecao){
        try {
            const novaInspecao = await inspecaoService.adicionar(dados);
            setInspecao((antigas) => [novaInspecao, ...antigas])
            return novaInspecao;
        } catch (error) {
            
            Alert.alert(
                "Erro!",
                "Problema ao cadastrar inspeção!"
            );

            throw error;
        }
    }

    return {
        adicionarInspecao
    }
}

export default useInspecao;