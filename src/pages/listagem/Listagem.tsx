import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNavBar from "../components/bottomNavBar";
import { api } from "../../services/api";
import {InspecaoApi} from "../../@types/inspecao"
import {buscarInspecoes} from "../../services/inspecao"

const abas = ["Todas", "Conforme", "Com pendência"];

function formatarData(dataIso: string) {
    const data = new Date(dataIso);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    const hora = String(data.getHours()).padStart(2, "0");
    const minuto = String(data.getMinutes()).padStart(2, "0");
    return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
}

export default function Listagem() {
    const [tabAtiva, setTabAtiva] = useState("Todas");
    const [inspecoes, setInspecoes] = useState<InspecaoApi[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(false);
    const navigation = useNavigation<any>();

    const carregarInspecoes = useCallback(async () => {
        setCarregando(true);
        setErro(false);
        try {
            const dados = await buscarInspecoes();
            setInspecoes(dados);
        } catch (error) {
            console.log("Erro ao buscar inspeções:", error);
            setErro(true);
        } finally {
            setCarregando(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            carregarInspecoes();
        }, [carregarInspecoes])
    );

    const inspecoesFiltradas = inspecoes.filter((item) => {
        if (tabAtiva === "Todas") return true;
        if (tabAtiva === "Conforme") return item.statusInspecao === false;
        if (tabAtiva === "Com pendência") return item.statusInspecao === true;
        return true;
    });

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.titulo}>Inspeções</Text>

                <TouchableOpacity
                    style={styles.botaoNova}
                    onPress={() => navigation.navigate("CriarInspecao")}
                >
                    <Text style={styles.botaoNovaTexto}>+ Nova inspeção</Text>
                </TouchableOpacity>

                <View style={styles.tabs}>
                    {abas.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setTabAtiva(tab)}
                            style={styles.tabItem}
                        >
                            <Text
                                style={[
                                    styles.tabTexto,
                                    tabAtiva === tab && styles.tabTextoAtiva,
                                ]}
                            >
                                {tab}
                            </Text>
                            {tabAtiva === tab && <View style={styles.tabIndicador} />}
                        </TouchableOpacity>
                    ))}
                </View>

                {carregando && (
                    <View style={styles.estadoContainer}>
                        <ActivityIndicator size="large" color="#0D2B6B" />
                        <Text style={styles.estadoTexto}>Carregando inspeções...</Text>
                    </View>
                )}

                {!carregando && erro && (
                    <View style={styles.estadoContainer}>
                        <Ionicons name="alert-circle-outline" size={32} color="#E53935" />
                        <Text style={styles.estadoTexto}>
                            Não foi possível carregar as inspeções.
                        </Text>
                        <TouchableOpacity
                            style={styles.botaoTentarNovamente}
                            onPress={buscarInspecoes}
                        >
                            <Text style={styles.botaoTentarNovamenteTexto}>
                                Tentar novamente
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {!carregando && !erro && inspecoesFiltradas.length === 0 && (
                    <View style={styles.estadoContainer}>
                        <Text style={styles.estadoTexto}>
                            Nenhuma inspeção encontrada.
                        </Text>
                    </View>
                )}

                {!carregando &&
                    !erro &&
                    inspecoesFiltradas.map((item) => (
                        <TouchableOpacity
                            key={item.inspecaoID}
                            onPress={() =>
                                navigation.navigate("Detalhes", { id: item.inspecaoID })
                            }
                            style={[
                                styles.card,
                                {
                                    borderLeftColor: item.statusInspecao
                                        ? "#E53935"
                                        : "#2E7D32",
                                },
                            ]}
                        >
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardTitulo}>{item.equipamento}</Text>
                                <View
                                    style={[
                                        styles.badge,
                                        {
                                            backgroundColor: item.statusInspecao
                                                ? "#FDECEA"
                                                : "#E6F4EA",
                                        },
                                    ]}
                                >
                                    <Ionicons
                                        name={
                                            item.statusInspecao
                                                ? "warning-outline"
                                                : "checkmark-circle-outline"
                                        }
                                        size={14}
                                        color={item.statusInspecao ? "#E53935" : "#2E7D32"}
                                    />
                                    <Text
                                        style={[
                                            styles.badgeTexto,
                                            {
                                                color: item.statusInspecao
                                                    ? "#E53935"
                                                    : "#2E7D32",
                                            },
                                        ]}
                                    >
                                        {item.statusTexto}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.linha}>
                                <Ionicons name="location-outline" size={14} color="#757575" />
                                <Text style={styles.textoSecundario}>
                                    {item.localizacao} • {item.cliente}
                                </Text>
                            </View>

                            <View style={styles.separador} />

                            <View style={styles.linhaData}>
                                <View style={styles.linha}>
                                    <MaterialCommunityIcons
                                        name="calendar-blank-outline"
                                        size={14}
                                        color="#757575"
                                    />
                                    <Text style={styles.textoSecundario}>
                                        {formatarData(item.dataCriacao)}
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color="#BDBDBD" />
                            </View>
                        </TouchableOpacity>
                    ))}
            </ScrollView>
            <BottomNavBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F6FA",
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 24,
    },
    titulo: {
        fontSize: 26,
        fontWeight: "800",
        color: "#1A1A1A",
        marginBottom: 16,
    },
    botaoNova: {
        backgroundColor: "#0D2B6B",
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: "center",
        marginBottom: 16,
    },
    botaoNovaTexto: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 15,
    },
    tabs: {
        flexDirection: "row",
        marginBottom: 16,
    },
    tabItem: {
        marginRight: 24,
        paddingBottom: 8,
    },
    tabTexto: {
        fontSize: 14,
        color: "#9E9E9E",
        fontWeight: "500",
    },
    tabTextoAtiva: {
        color: "#0D2B6B",
        fontWeight: "700",
    },
    tabIndicador: {
        marginTop: 6,
        height: 2,
        backgroundColor: "#0D2B6B",
        borderRadius: 1,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderLeftWidth: 4,
        padding: 14,
        marginBottom: 14,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 8,
    },
    cardTitulo: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1A1A1A",
        flexShrink: 1,
    },
    badge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
        gap: 4,
    },
    badgeTexto: {
        fontSize: 12,
        fontWeight: "600",
        marginLeft: 4,
    },
    linha: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    textoSecundario: {
        fontSize: 13,
        color: "#757575",
        marginLeft: 6,
    },
    separador: {
        height: 1,
        backgroundColor: "#EEEEEE",
        marginVertical: 10,
    },
    linhaData: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    estadoContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 40,
        gap: 8,
    },
    estadoTexto: {
        fontSize: 14,
        color: "#757575",
        textAlign: "center",
    },
    botaoTentarNovamente: {
        marginTop: 8,
        backgroundColor: "#0D2B6B",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    botaoTentarNovamenteTexto: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 13,
    },
});