import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Perfil() {
    return (
        <View>
            <View style={estilos.cabecalho}>
                <Image source={require('../../../assets/imgs/Text.png')} style={estilos.imgLogo} />
                <Image source={require('../../../assets/imgs/perfil.png')} style={estilos.imgPerfil1} />
            </View>
            <View>
                <Text style={estilos.text1}>Perfil</Text>
            </View>
            <View style={estilos.iniciaisPerfil}>
                <Image source={require('../../../assets/imgs/perfil.png')} style={estilos.imgPerfil2} />
            </View>
        </View>
    )
}

const estilos = StyleSheet.create({
    safearea: { flex: 1 },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    cabecalho: {
        gap: 200,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 10,
    },

    imgLogo: {

    },
    imgPerfil1: {
        width: 40,
        height: 45,
        borderRadius: 10
    },

    text1: {
        fontSize: 30,
        fontWeight: "bold",
        margin: 30,
    },

    imgPerfil2: {
        width: 100,
        height: 110,
        borderRadius: 10,
    },

    iniciaisPerfil: {
        flex: 1,                 // Ocupa todo o espaço disponível
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'center',     // Centraliza horizontalmente
        backgroundColor: '#ee3e3e',
        padding: 75,
        
    }

})
