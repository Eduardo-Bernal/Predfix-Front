import { useEffect, useState } from "react";
import { InspecaoApi } from "../@types/inspecao";
import { inspecaoService } from "../services/inspecaoService";

export function useDetalheInspecao(id: number) {
  const [inspecao, setInspecao] = useState<InspecaoApi | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarInspecao() {
      try {
        setCarregando(true);
        setErro("");

        const dados = await inspecaoService.buscarPorId(id);

        setInspecao(dados);
      } catch (error) {
        console.error("Erro ao carregar inspeção:", error);
        setErro("Não foi possível carregar a inspeção.");
      } finally {
        setCarregando(false);
      }
    }

    carregarInspecao();
  }, [id]);

  const dataFormatada = inspecao?.dataCriacao
    ? new Date(inspecao.dataCriacao).toLocaleString("pt-BR")
    : "";

  return {
    inspecao,
    carregando,
    erro,
    dataFormatada,
  };
}