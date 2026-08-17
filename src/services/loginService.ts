import {api} from "./api";
import * as SecureStore from "expo-secure-store";

export async function loginService(email: string, senha: string) {
    const response = await api.post("Autenticacao/login", {
        email,
        senha,
    });

    const token = response.data.token;

    await SecureStore.setItemAsync("token", token);

    return response.data;
}