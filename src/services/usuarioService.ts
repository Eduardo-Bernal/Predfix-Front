

import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { UsuarioPayload, Usuario } from "../@types/autenticacao";

export const usuarioService = {
  async obterDadosDoToken(): Promise<Usuario | null> {
    try {
      const tokenKey = process.env.EXPO_PUBLIC_TOKEN_KEY || "@token";
      const token = await AsyncStorage.getItem(tokenKey);

      if (!token) return null;

      // Decodifica a estrutura informada
      const payload = jwtDecode<UsuarioPayload>(token);

      // Mapeia os schemas do .NET para propriedades simples
      return {
        id: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        nome: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        email: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        
      };
    } catch (error) {
      console.error("Erro ao decodificar o token JWT:", error);
      return null;
    }
  }
};