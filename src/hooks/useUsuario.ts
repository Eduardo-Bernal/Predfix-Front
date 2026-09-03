import { useState, useEffect } from "react";
import { Usuario } from "../@types/autenticacao";
import { usuarioService } from "../services/usuarioService";

export function useUsuario() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState<boolean>(true);

  async function carregarUsuario() {
    setCarregando(true);
    const dados = await usuarioService.obterDadosDoToken();
    setUsuario(dados);
    setCarregando(false);
  }

  useEffect(() => {
    carregarUsuario();
  }, []);

  return {
    usuario,
    carregando,
    recarregarUsuario: carregarUsuario
  };
}