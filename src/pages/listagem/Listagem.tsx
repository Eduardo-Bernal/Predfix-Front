import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNavBar from "../components/bottomNavBar";
import {listarInspecoes} from "../../services/ListagemService";

interface Inspecao {
    inspecaoID: number;
    equipamento: string;
    localizacao: string;
    cliente: string;
    statusInspecao: boolean;
    statusTexto: string;
    dataCriacao: string;
    usuarioID: number;
}

const abas = ["Todas", "Conforme", "Com pendência"] as const;
type Aba = (typeof abas)[number];

function temPendencia(inspecao: Inspecao) {
    return inspecao.statusInspecao === true;
}

function formatarData(dataCriacao: string) {
    const data = new Date(dataCriacao);
    if (isNaN(data.getTime())) return dataCriacao;

    return data.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function Listagem() {
    const [tabAtiva, setTabAtiva] = useState<Aba>("Todas");
    const [inspecoes, setInspecoes] = useState<Inspecao[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [atualizando, setAtualizando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    const carregarInspecoes = useCallback(async () => {
        setErro(null);
        try {
            const data = await listarInspecoes();
            setInspecoes(data ?? []);
        } catch (error) {
            setErro("Não foi possível carregar as inspeções.");
        }
    }, []);

    useEffect(() => {
        (async () => {
            setCarregando(true);
            await carregarInspecoes();
            setCarregando(false);
        })();
    }, [carregarInspecoes]);

    const onRefresh = useCallback(async () => {
        setAtualizando(true);
        await carregarInspecoes();
        setAtualizando(false);
    }, [carregarInspecoes]);

    const inspecoesFiltradas = inspecoes.filter((item) => {
        if (tabAtiva === "Todas") return true;
        if (tabAtiva === "Conforme") return !temPendencia(item);
        if (tabAtiva === "Com pendência") return temPendencia(item);
        return true;
    });

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl refreshing={atualizando} onRefresh={onRefresh} />
                }
            >
                <Text style={styles.titulo}>Inspeções</Text>

                <TouchableOpacity style={styles.botaoNova}>
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
                        <Ionicons name="alert-circle-outline" size={28} color="#E53935" />
                        <Text style={styles.estadoTexto}>{erro}</Text>
                        <TouchableOpacity onPress={carregarInspecoes} style={styles.botaoTentarNovamente}>
                            <Text style={styles.botaoTentarNovamenteTexto}>Tentar novamente</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {!carregando && !erro && inspecoesFiltradas.length === 0 && (
                    <View style={styles.estadoContainer}>
                        <Ionicons name="document-text-outline" size={28} color="#9E9E9E" />
                        <Text style={styles.estadoTexto}>Nenhuma inspeção encontrada.</Text>
                    </View>
                )}

                {!carregando &&
                    !erro &&
                    inspecoesFiltradas.map((item) => {
                        const pendente = temPendencia(item);
                        return (
                            <TouchableOpacity
                                key={item.inspecaoID}
                                style={[
                                    styles.card,
                                    {
                                        borderLeftColor: pendente ? "#E53935" : "#2E7D32",
                                    },
                                ]}
                            >
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardTitulo}>{item.equipamento}</Text>
                                    <View
                                        style={[
                                            styles.badge,
                                            {
                                                backgroundColor: pendente ? "#FDECEA" : "#E6F4EA",
                                            },
                                        ]}
                                    >
                                        <Ionicons
                                            name={
                                                pendente ? "warning-outline" : "checkmark-circle-outline"
                                            }
                                            size={14}
                                            color={pendente ? "#E53935" : "#2E7D32"}
                                        />
                                        <Text
                                            style={[
                                                styles.badgeTexto,
                                                {
                                                    color: pendente ? "#E53935" : "#2E7D32",
                                                },
                                            ]}
                                        >
                                            {item.statusTexto}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.linha}>
                                    <Ionicons name="location-outline" size={14} color="#757575" />
                                    <Text style={styles.textoSecundario}>{item.localizacao}</Text>
                                </View>

                                <View style={styles.linha}>
                                    <Ionicons name="business-outline" size={14} color="#757575" />
                                    <Text style={styles.textoSecundario}>{item.cliente}</Text>
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
                        );
                    })}
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
        marginBottom: 4,
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
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: "#0D2B6B",
    },
    botaoTentarNovamenteTexto: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 13,
    },
});