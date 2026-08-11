import { View, Text, TextInput, Alert, Pressable, StyleSheet, ScrollView } from "react-native";
import { AudioModule, RecordingPresets, setAudioModeAsync, useAudioRecorder, useAudioRecorderState } from "expo-audio";
import React, { useEffect, useState } from "react";


export default function CriarInspecao() {

    const [situacao, setSituacao] = useState<"conforme" | "pendencia" | null>(null);

    const audioRecorder = useAudioRecorder(
        RecordingPresets.HIGH_QUALITY
    );

    const recorderState = useAudioRecorderState(audioRecorder);

    // Solicita permissão para utilizar o microfone
    useEffect(() => {
        async function configurarAudio() {

            const permissao =
                await AudioModule.requestRecordingPermissionsAsync();

            if (!permissao.granted) {
                Alert.alert(
                    "Permissão necessária",
                    "Permita o acesso ao microfone para gravar a observação."
                );

                return;
            }

            await setAudioModeAsync({
                playsInSilentMode: true,
                allowsRecording: true,
            });
        }

        configurarAudio();
    }, []);

    // Começa a gravação
    async function iniciarGravacao() {
        try {
            await audioRecorder.prepareToRecordAsync();

            audioRecorder.record();

        } catch (error) {
            console.log("Erro ao iniciar gravação:", error);

            Alert.alert(
                "Erro",
                "Não foi possível iniciar a gravação."
            );
        }
    }

    // Para a gravação
    async function pararGravacao() {
        try {
            await audioRecorder.stop();

            console.log("Áudio:", audioRecorder.uri);

            Alert.alert(
                "Áudio gravado",
                "A observação foi gravada com sucesso."
            );

        } catch (error) {
            console.log("Erro ao parar gravação:", error);

            Alert.alert(
                "Erro",
                "Não foi possível finalizar a gravação."
            );
        }
    }

    // Decide se inicia ou para
    async function controlarGravacao() {

        if (recorderState.isRecording) {
            await pararGravacao();
        } else {
            await iniciarGravacao();
        }
    }

    function salvarInspecao() {
        if (!audioRecorder.uri) {
            Alert.alert(
                "Áudio obrigatório",
            );

            return;
        }
    }

    return (
        // tela inteira
        <ScrollView
            contentContainerStyle={estilos.container}
            showsVerticalScrollIndicator={false}
        >

            {/* forms */}
            <View style={estilos.forms}>
                <Text style={estilos.label}>EQUIPAMENTO</Text>
                <TextInput
                    placeholder="Ex: Bomba Hidráulica BH-01"
                    placeholderTextColor={"#5D6574"}
                    style={estilos.input}
                ></TextInput>

                <Text style={estilos.label}>LOCAL</Text>
                <TextInput
                    placeholder="Ex: Setor Sul"
                    placeholderTextColor={"#5D6574"}
                    style={estilos.input}
                ></TextInput>

                <Text style={estilos.label}>CLIENTE</Text>
                <TextInput
                    placeholder="Ex: Cliente Alpha"
                    placeholderTextColor={"#5D6574"}
                    style={estilos.input}
                ></TextInput>



                <Text style={estilos.label}>SITUAÇÃO</Text>
                <View style={estilos.botoesSituacao}>

                    {/* Conforme */}
                    <Pressable
                        onPress={() => setSituacao("conforme")}
                        style={[
                            estilos.botaoSituacao,
                            situacao === "conforme" && estilos.botaoConformeAtivo,
                        ]}
                    >
                        <Text
                            style={[
                                estilos.iconeSituacao,
                                situacao === "conforme" && estilos.textoAtivo,
                            ]}
                        >
                            ✓
                        </Text>

                        <Text
                            style={[
                                estilos.textoSituacao,
                                situacao === "conforme" && estilos.textoAtivo,
                            ]}
                        >
                            Conforme
                        </Text>
                    </Pressable>


                    {/* COM PENDÊNCIA */}
                    <Pressable
                        onPress={() => setSituacao("pendencia")}
                        style={[
                            estilos.botaoSituacao,
                            situacao === "pendencia" && estilos.botaoPendenciaAtivo,
                        ]}
                    >
                        <Text
                            style={[
                                estilos.iconeSituacao,
                                situacao === "pendencia" && estilos.textoAtivo,
                            ]}
                        >
                            ⚠
                        </Text>

                        <Text
                            style={[
                                estilos.textoSituacao,
                                situacao === "pendencia" && estilos.textoAtivo,
                            ]}
                        >
                            Com
                            {"\n"}
                            pendência
                        </Text>
                    </Pressable>

                </View>


            </View>

            {/* audio */}
            <View style={estilos.formAudio}>
                <Text style={estilos.tituloAudio}>Observação em áudio</Text>
                <Text>Grave uma nota de voz detalhando a inspeção.</Text>
                <Text style={estilos.obrigatorio}>*Obrigatório</Text>

                <Pressable
                    onPress={controlarGravacao}
                    style={[
                        estilos.botaoAudio,

                        recorderState.isRecording
                            ? estilos.botaoGravando
                            : audioRecorder.uri
                                ? estilos.botaoGravado
                                : estilos.botaoInicial,
                    ]}
                >

                    {recorderState.isRecording ? (

                        <>
                            <Text style={estilos.icone}>
                                ■
                            </Text>

                            <Text style={estilos.textoBotao}>
                                Gravando...
                            </Text>

                            <Text style={estilos.tempo}>
                                {Math.floor(
                                    recorderState.durationMillis / 1000
                                )}s
                            </Text>
                        </>

                    ) : audioRecorder.uri ? (

                        <>
                            <Text style={estilos.icone}>
                                ✓
                            </Text>

                            <Text style={estilos.textoBotao}>
                                Áudio gravado
                            </Text>
                        </>

                    ) : (

                        <>
                            <Text style={estilos.icone}>
                                🎙
                            </Text>

                            <Text style={estilos.textoBotao}>
                                Gravar observação
                            </Text>
                        </>

                    )}

                </Pressable>
            </View>

            {/* botao salvar */}
            <View>
                <Pressable
                    style={estilos.botaoSalvar}
                    onPress={salvarInspecao}
                >
                    <Text style={estilos.textoSalvar}>
                        Salvar inspeção
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const estilos = StyleSheet.create({
    container: {
        backgroundColor: "#FAF9FF",
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },

    forms: {
        backgroundColor: "#FFFFFF",
        margin: 10,
        width: "100%",
        padding: 10,
        height: 300,
        borderRadius: 4,
        borderColor: "#rgba(93, 101, 116, 0.5)",
        borderWidth: 1,
    },

    label: {
        fontWeight: "bold",
    },

    input: {
        backgroundColor: "#FAF9FF",
        borderColor: "#rgba(93, 101, 116, 0.8)",
        borderWidth: 1,
        borderRadius: 4,
        width: "100%",
        height: 40,
        padding: 5,
        marginBottom: 10

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
        height: 40,
        // width: "100%",

        borderWidth: 2,
        borderColor: "#C5C9D8",
        borderRadius: 4,

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
        fontSize: 20,
        color: "#777D8C",
        fontWeight: "500",
    },

    textoSituacao: {
        fontSize: 10,
        fontWeight: "500",
        color: "#777D8C",
        textAlign: "center",
    },

    textoAtivo: {
        color: "#FFFFFF",
    },

    formAudio: {
        backgroundColor: "#FFFFFF",
        margin: 10,
        width: "100%",
        padding: 10,
        height: 300,
        borderRadius: 4,
        borderColor: "#rgba(93, 101, 116, 0.5)",
        borderWidth: 1,
    },

    tituloAudio: {
        fontWeight: "bold"
    },

    obrigatorio: {
        color: "#BA0D0D"
    },

    botaoAudio: {
        backgroundColor: "#003D9B",
        width: 200,
        height: 200,
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        alignSelf: "center"
    },

    icone: {
        color: "white",
        fontSize: 50
    },

    textoBotao: {
        color: "white"
    },

    tempo: {
        color: "white"
    },

    botaoGravando: {
        backgroundColor: "#BA0D0D"
    },

    botaoGravado: {
        backgroundColor: "green"
    },

    botaoSalvar: {
        backgroundColor: "#003D9B",
        height: 40,
        width: 310,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        marginTop: 30
    },

    textoSalvar: {
        color: "white",
        fontWeight: "bold"
    }
})