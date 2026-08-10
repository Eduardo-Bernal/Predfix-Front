import Routes from "./src/routes";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "react-native";
import React from "react";

export default function App() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}}>
                <Routes />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}