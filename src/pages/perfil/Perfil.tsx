import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import BottomNavBar from "../components/bottomNavBar";

export default function Perfil() {
    return (
        <View style={estilos.container}>
            <View>
                <View style={estilos.linha}></View>
                <View>
                    <Text style={estilos.text1}>Perfil</Text>
                </View>
                <View style={estilos.iniciaisPerfil}>
                    <Image source={require('../../../assets/perfil.png')} style={estilos.imgPerfil2} />
                </View>
                <View style={estilos.areaDados}>
                    <View style={estilos.areaNome}>
                        <Text style={estilos.nome1}>Nome</Text>
                        <Text style={estilos.nome2}>João Carlos</Text>
                    </View>
                    <View style={estilos.linha}></View>
                    <View style={estilos.areaEmail}>
                        <Text style={estilos.email1}>Email</Text>
                        <Text style={estilos.email2}>joaocarlos@predifix.com</Text>
                    </View>
                </View>
                
            </View>
            <BottomNavBar active={"Perfil"} />
        </View>
        
    )
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

    cabecalho: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 10,
    },

    imgLogo: {
        width: 100,
        height: 40,
        resizeMode: "contain",
    },

    imgPerfil1: {
        width: 40,
        height: 45,
        borderRadius: 10,
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
        borderColor: "#cacaca",
        borderWidth: 0,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,

    },

    imgPerfil2: {
        width: 100,
        height: 110,
        borderRadius: 10,
    },

    areaDados: {
        backgroundColor: "#f3f3f3",
        padding: 20,
        marginHorizontal: 30,
        marginTop: 15,
        borderRadius: 10,
        borderColor: "#cacaca",
        borderWidth: 0,
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