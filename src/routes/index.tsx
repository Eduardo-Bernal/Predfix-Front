import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "./types";
import React from "react";
import Login from "../pages/login/Login";
import Listagem from "../pages/listagem/Listagem";
import Perfil from "../pages/perfil/Perfil";
import Detalhes from "../pages/detalhes/Detalhes";
import CriarInspecao from "../pages/criarInspecao/CriarInspecao";



const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {

    // rpz se usa assim se for chamado em um botao
    // -------------------------------------------- //
    // redirect depois de uma requisicao
    // async function handleLogin() {
    //     try {
    //         await loginService(email, senha);
    //         navigation.navigate("Listagem");
    //
    //     }catch (error) {
    //         console.error('Erro ao fazer login:', error);
    //     }
    // }
    // onPress={() => navigation.navigate("Login")}
    // onPress={() => navigation.navigate("Listagem")}
    // onPress={() => navigation.navigate("Perfil")}
    // onPress={() => navigation.navigate("Detalhes")}
    // onPress={() => navigation.navigate("CriarInspecao")}

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen
                    name="Login"
                    component={Login}
                />

                <Stack.Screen
                    name="Listagem"
                    component={Listagem}
                />

                <Stack.Screen
                    name="Perfil"
                    component={Perfil}
                />

                <Stack.Screen
                    name="Detalhes"
                    component={Detalhes}
                />

                <Stack.Screen
                    name="CriarInspecao"
                    component={CriarInspecao}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}