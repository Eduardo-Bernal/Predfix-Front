import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../routes/types";
import React from "react";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function BottomNavBar({
                                         active = "Listagem",
                                     }: {
    active?: string;
}) {
    const navigation = useNavigation<NavigationProps>();

    return (
        <View style={styles.navBar}>
            <TouchableOpacity
                style={styles.tab}
                onPress={() => navigation.navigate("Listagem")}
            >
                <Feather
                    name="clipboard"
                    size={22}
                    color={active === "Listagem" ? "#006EFF" : "#999"}
                />
                <Text
                    style={[
                        styles.tabLabel,
                        {
                            color:
                                active === "Listagem"
                                    ? "#006EFF"
                                    : "#999",
                        },
                    ]}
                >
                    Inspeções
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.tab}
                onPress={() => navigation.navigate("Perfil")}
            >
                <Feather
                    name="user"
                    size={22}
                    color={active === "Perfil" 
                        ? "#006EFF" 
                        : "#999"
                    }
                />
                <Text
                    style={[
                        styles.tabLabel,
                        {
                            color:
                                active === "Perfil"
                                    ? "#006EFF"
                                    : "#999",
                        },
                    ]}
                >
                    Perfil
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    navBar: {
        flexDirection: "row",
        backgroundColor: "white",
        paddingTop: 10,
        paddingBottom: 20,
        borderTopWidth: 1,
        borderTopColor: "#eee",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    tab: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    tabLabel: {
        fontSize: 11,
        fontWeight: "600",
        marginTop: 4,
    },
});