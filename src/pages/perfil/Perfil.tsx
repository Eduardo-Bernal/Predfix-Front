import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import BottomNavBar from "../components/bottomNavBar";
import { useUsuario } from "../../hooks/useUsuario";
import { FormatarIconNome } from "../../utils/formatarNome";

export default function Perfil() {
    // Busca o usuário decodificado pelo Hook
    const { usuario, carregando } = useUsuario();

    // Exibe um indicador de carregamento enquanto lê o AsyncStorage e decodifica o token
    if (carregando) {
        return (
            <View style={[estilos.container, estilos.centralizarLoading]}>
                <ActivityIndicator size="large" color="#003077" />
            </View>
        );
    }

    return (
        <View style={estilos.container}>
            <View>
                <View style={estilos.linha}></View>
                <View>
                    <Text style={estilos.text1}>Perfil</Text>
                </View>
                <View style={estilos.iniciaisPerfil}>
                    <Text style={estilos.iniciaisPerfil2}>
                        {usuario?.nome ? FormatarIconNome(usuario.nome) : "😔"}
                    </Text>
                </View>
                <View style={estilos.areaDados}>
                    <View style={estilos.areaNome}>
                        <Text style={estilos.nome1}>Nome</Text>
                        <Text style={estilos.nome2}>{usuario?.nome || "Não informado"}</Text>
                    </View>
                    <View style={estilos.linha}></View>
                    <View style={estilos.areaEmail}>
                        <Text style={estilos.email1}>Email</Text>
                        <Text style={estilos.email2}>{usuario?.email || "Não informado"}</Text>
                    </View>
                </View>
            </View>
            <BottomNavBar active={"Perfil"} />
        </View>
    );
}

const estilos = StyleSheet.create({
    safearea: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#F5F6FA"
    },
    centralizarLoading: {
        justifyContent: "center",
        alignItems: "center"
    },
    text1: {
        fontSize: 30,
        fontWeight: "bold",
        marginHorizontal: 30,
        marginTop: 10,
        marginBottom: 15,
    },
    iniciaisPerfil: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f3f3",
        padding: 20,
        marginHorizontal: 30,
        marginTop: 0,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    iniciaisPerfil2: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#003077",
        color: "#ffffff",
        padding: 20,
        marginHorizontal: 30,
        marginTop: 0,
        marginBottom: 15,
        borderRadius: 999,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
        fontSize: 50,
    },
    areaDados: {
        backgroundColor: "#f3f3f3",
        padding: 20,
        marginHorizontal: 30,
        marginTop: 15,
        borderRadius: 10,
        gap: 10,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    areaNome: {
        marginBottom: 15,
    },
    nome1: {
        fontSize: 20,
        fontWeight: "bold",
    },
    nome2: {
        fontSize: 15,
    },
    areaEmail: {},
    email1: {
        fontSize: 20,
        fontWeight: "bold",
    },
    email2: {
        fontSize: 15,
    },
    linha: {
        height: 1,
        width: "100%",
        backgroundColor: '#bbbaba',
    },
});