import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNavBar from "../components/bottomNavBar";

const inspecoes = [
    {
        id: 1,
        titulo: "Elevador Social",
        local: "Condomínio Solar",
        data: "25/10/2023 10:30",
        status: "pendencia",
    },
    {
        id: 2,
        titulo: "Extintor PQS",
        local: "Empresa Tech",
        data: "24/10/2023 14:15",
        status: "conforme",
    },
    {
        id: 3,
        titulo: "Gerador Principal",
        local: "Hospital Central",
        data: "23/10/2023 09:00",
        status: "conforme",
    },
];

const abas = ["Todas", "Conforme", "Com pendência"];

export default function Listagem() {
    const [tabAtiva, setTabAtiva] = useState("Todas");

    const inspecoesFiltradas = inspecoes.filter((item) => {
        if (tabAtiva === "Todas") return true;
        if (tabAtiva === "Conforme") return item.status === "conforme";
        if (tabAtiva === "Com pendência") return item.status === "pendencia";
        return true;
    });

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
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

                {inspecoesFiltradas.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[
                            styles.card,
                            {
                                borderLeftColor:
                                    item.status === "pendencia" ? "#E53935" : "#2E7D32",
                            },
                        ]}
                    >
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitulo}>{item.titulo}</Text>
                            <View
                                style={[
                                    styles.badge,
                                    {
                                        backgroundColor:
                                            item.status === "pendencia" ? "#FDECEA" : "#E6F4EA",
                                    },
                                ]}
                            >
                                <Ionicons
                                    name={
                                        item.status === "pendencia"
                                            ? "warning-outline"
                                            : "checkmark-circle-outline"
                                    }
                                    size={14}
                                    color={item.status === "pendencia" ? "#E53935" : "#2E7D32"}
                                />
                                <Text
                                    style={[
                                        styles.badgeTexto,
                                        {
                                            color:
                                                item.status === "pendencia" ? "#E53935" : "#2E7D32",
                                        },
                                    ]}
                                >
                                    {item.status === "pendencia" ? "Pendência" : "Conforme"}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.linha}>
                            <Ionicons name="location-outline" size={14} color="#757575" />
                            <Text style={styles.textoSecundario}>{item.local}</Text>
                        </View>

                        <View style={styles.separador} />

                        <View style={styles.linhaData}>
                            <View style={styles.linha}>
                                <MaterialCommunityIcons
                                    name="calendar-blank-outline"
                                    size={14}
                                    color="#757575"
                                />
                                <Text style={styles.textoSecundario}>{item.data}</Text>
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
});