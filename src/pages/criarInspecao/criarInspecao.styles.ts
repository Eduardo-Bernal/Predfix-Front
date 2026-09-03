import { StyleSheet } from "react-native"

export const estilos = StyleSheet.create({
    container: {
        backgroundColor: "#F5F6FA",
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        // height: "100%"
    },

    cabecalho: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 12,
    },

    linha: {
        height: 2,
        backgroundColor: "#rgba(93, 101, 116, 0.3)",
        width: "120%",
    },

    titulo_cabecalho: {
        color: "#000",
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        marginLeft: 50,
        marginTop: -4
    },

    forms: {
        backgroundColor: "white",
        margin: 30,
        width: "100%",
        padding: 20,
        height: 490,
        borderRadius: 10,
        borderColor: "#rgba(93, 101, 116, 0.5)",
        borderWidth: 1,
    },

    label: {
        fontWeight: "bold",
        color: "#rgba(93, 101, 116, 1)",
        fontSize: 20,
        marginBottom: 10,
    },

    input: {
        backgroundColor: "#F8F7FF",
        borderColor: "#rgba(93, 101, 116, 0.8)",
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 10,
        width: "100%",
        height: 60,
        padding: 5,
        marginBottom: 20

    },

    situacaoContainer: {
        marginTop: 15,
    },

    botoesSituacao: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },

    botaoSituacao: {
        flex: 1,
        height: 60,
        // width: "100%",

        borderWidth: 2,
        borderColor: "#C5C9D8",
        borderRadius: 10,

        backgroundColor: "#FFFFFF",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        gap: 10,
    },

    botaoConformeAtivo: {
        backgroundColor: "#DFF3E4",
        borderColor: "#219653",
    },

    botaoPendenciaAtivo: {
        backgroundColor: "#FFF3CD",
        borderColor: "#E0A800",
    },

    iconeSituacao: {
        fontSize: 30,
        color: "#777D8C",
        fontWeight: "500",
    },

    textoSituacao: {
        fontSize: 20,
        fontWeight: "500",
        color: "#777D8C",
        textAlign: "center",
    },

    textoAtivo: {
        color: "black",
    },

    formAudio: {
        backgroundColor: "#FFFFFF",
        margin: 10,
        marginBottom: 30,
        width: "100%",
        padding: 20,
        height: 370,
        borderRadius: 10,
        borderColor: "#rgba(93, 101, 116, 0.5)",
        borderWidth: 1,
    },

    tituloAudio: {
        fontWeight: "bold",
        fontSize: 25,
    },

    textoAudio: {
        fontSize: 20
    },

    obrigatorio: {
        color: "#BA0D0D",
        fontSize: 20
    },

    botaoAudio: {
        backgroundColor: "#003D9B",
        width: 200,
        height: 200,
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        alignSelf: "center",
    },

    icone: {
        color: "white",
        fontSize: 60
    },

    textoBotao: {
        color: "white",
        fontSize: 20,
        paddingTop: 10
    },

    tempo: {
        color: "white",
        fontSize: 20
    },

    botaoGravando: {
        backgroundColor: "#BA0D0D"
    },

    botaoGravado: {
        backgroundColor: "green"
    },

    botaoInicial: {},

    botaoSalvar: {
        backgroundColor: "#003D9B",
        height: 60,
        width: 360,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20
    },

    textoSalvar: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    }
})