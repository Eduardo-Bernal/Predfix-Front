import { api } from "./api";
import { Login, LoginResponse } from "./../@types/autenticacao";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const autenticacaoService = {
    async login(dados: Login): Promise<LoginResponse> {
        const { data } = await api.post<LoginResponse>("Autenticacao/login", dados);

        if (data?.token) {
            await AsyncStorage.setItem(process.env.EXPO_PUBLIC_TOKEN_KEY, data.token);
        }

        return data;
    },
};