import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
import { Platform } from "react-native";

//definindo o host local conforme plataforma(expo, web, ios...)
const host = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const porta = process.env.EXPO_PUBLIC_PORTA;
//dessa forma, conseguimos rodar tanto na web quanto no emulador
const enderecoApi = process.env.EXPO_PUBLIC_API_URL || `http://${host}:${porta}`;

export const api = axios.create({
    baseURL: enderecoApi,
    timeout: 10000
});

//SOLICITAÇÃO/REQUISIÇÃO --OPAAA PERA AI, QUERO O MEU TOKEN DO USUÁRIO-->
//interceptar/impedir o curso toda requisição feita pela API
api.interceptors.request.use(async (config) =>{
    const token = await AsyncStorage.getItem(process.env.EXPO_PUBLIC_TOKEN_KEY);

    if(token){
        //configurar o Bearer
        config.headers.Authorization = "Bearer " + token
    }

    return config;
})