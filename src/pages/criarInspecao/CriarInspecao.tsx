import { View, Text, TextInput, Alert, Pressable, ScrollView, TouchableOpacity } from "react-native";
import { AudioModule, RecordingPresets, setAudioModeAsync, useAudioRecorder, useAudioRecorderState } from "expo-audio";
import React, { useEffect, useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { estilos } from "./criarInspecao.styles";
import { AdicionarInspecao, ObservacaoUpload } from "../../@types/criarInspecao";
import useInspecao from "../../hooks/useInspecao";
import { useNavigation } from "@react-navigation/native";



export default function CriarInspecao() {

    const navigation = useNavigation();

    const { adicionarInspecao } = useInspecao();

    // data para forms
    const [equipamento, setEquipamento] = useState("");
    const [localizacao, setLocalizacao] = useState("");
    const [cliente, setCliente] = useState("");
    const [situacao, setSituacao] = useState<"conforme" | "pendencia" | null>(null);
    // aqui e nulo so na hora de criar uma nova inspecao
    const [observacao, setObservacao] = useState<ObservacaoUpload | null>(null);

    async function handleSave() {
        if (
            !equipamento.trim() ||
            !localizacao.trim() ||
            !cliente.trim() ||
            !situacao ||
            !observacao
        ) {
            Alert.alert(
                "Atenção!",
                "Preencha todos os campos obrigatórios (*)."
            );
            return;
        }

        const novaInspecao: AdicionarInspecao = {
            equipamento: equipamento,
            localizacao: localizacao,
            cliente: cliente,
            statusInspecao: situacao === "pendencia",
            observacao: observacao
        };

        try {
            const sucesso = await adicionarInspecao(novaInspecao);

            if (sucesso) {

                // limpa os campos
                setEquipamento("");
                setLocalizacao("");
                setCliente("");
                setSituacao(null);
                setObservacao(null);

                Alert.alert(
                    "Cadastro realizado!",
                    "Inspeção salva com sucesso!",
                );
            }

        } catch (error) {
            console.log("Erro ao salvar inspeção:", error);
        }
    }

    // uso do recurso nativo Microfone
    const audioRecorder = useAudioRecorder(
        RecordingPresets.HIGH_QUALITY
    );

    const recorderState = useAudioRecorderState(audioRecorder);

    // solicita permissão para utilizar o microfone
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

    // começa a gravação
    async function iniciarGravacao() {
        try {
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

            await audioRecorder.prepareToRecordAsync();

            audioRecorder.record();

            setObservacao(null);

            console.log("Gravação iniciada");

        } catch (error) {
            console.log(
                "Erro ao iniciar gravação:",
                error
            );

            Alert.alert(
                "Erro",
                "Não foi possível iniciar a gravação."
            );
        }
    }

    // para a gravação
    async function pararGravacao() {
        try {
            await audioRecorder.stop();

            const uri = audioRecorder.uri;

            console.log("URI DO ÁUDIO:", uri);

            if (!uri) {
                Alert.alert(
                    "Erro",
                    "Não foi possível obter o áudio gravado."
                );

                return;
            }

            const novoAudio: ObservacaoUpload = {
                uri: uri,
                name: `observacao_${Date.now()}.m4a`,
                mimeType: "audio/m4a",
            };

            setObservacao(novoAudio);

            console.log(
                "Áudio gravado:",
                uri
            );

        } catch (error) {
            console.log(
                "Erro ao parar gravação:",
                error
            );

            Alert.alert(
                "Erro",
                "Não foi possível finalizar a gravação."
            );
        }
    }

    // decide se inicia ou para
    async function controlarGravacao() {

        if (recorderState.isRecording) {
            await pararGravacao();
        } else {
            await iniciarGravacao();
        }
    }

    // function salvarInspecao() {
    //     if (!audioRecorder.uri) {
    //         Alert.alert(
    //             "Áudio obrigatório",
    //         );

    //         return;
    //     }
    // }

    return (
        <>
            {/* statusBar */}
            <StatusBar hidden />

            {/* tela inteira */}
            <ScrollView
                contentContainerStyle={estilos.container}
                showsVerticalScrollIndicator={false}
            >
                {/* voltar para listagem com cabecalho */}
                <View style={estilos.cabecalho}>
                    <TouchableOpacity onPress={() => navigation.navigate("Listagem")}>
                                                                     {/* ta com erro, mas funciona normalmente */}
                        <Ionicons name="arrow-back" size={32} color="blue" />
                    </TouchableOpacity>
                    <Text style={estilos.titulo_cabecalho}> Nova Inspeção </Text>
                </View>

                <View style={estilos.linha} />

                {/* forms */}
                <View style={estilos.forms}>
                    <Text style={estilos.label}>EQUIPAMENTO *</Text>
                    <TextInput
                        placeholder="Ex: Bomba Hidráulica BH-01"
                        placeholderTextColor={"#5D6574"}
                        style={estilos.input}
                        onChangeText={setEquipamento}
                        value={equipamento}
                    ></TextInput>

                    <Text style={estilos.label}>LOCAL *</Text>
                    <TextInput
                        placeholder="Ex: Setor Sul"
                        placeholderTextColor={"#5D6574"}
                        style={estilos.input}
                        onChangeText={setLocalizacao}
                        value={localizacao}
                    ></TextInput>

                    <Text style={estilos.label}>CLIENTE *</Text>
                    <TextInput
                        placeholder="Ex: Cliente Alpha"
                        placeholderTextColor={"#5D6574"}
                        style={estilos.input}
                        onChangeText={setCliente}
                        value={cliente}
                    ></TextInput>



                    <Text style={estilos.label}>SITUAÇÃO *</Text>
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
                    <Text style={estilos.tituloAudio}>
                        Observação em áudio
                    </Text>

                    <Text style={estilos.textoAudio}>
                        Grave uma nota de voz detalhando a inspeção.
                    </Text>

                    <Text style={estilos.obrigatorio}>
                        *Obrigatório
                    </Text>

                    <Pressable
                        onPress={controlarGravacao}
                        style={[
                            estilos.botaoAudio,
                            recorderState.isRecording
                                ? estilos.botaoGravando
                                : observacao
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
                        ) : observacao ? (
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
                                <Feather
                                    name="mic"
                                    size={50}
                                    color="#0878F9"
                                />

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
                        onPress={handleSave}
                    >
                        <Text style={estilos.textoSalvar}>
                            Salvar inspeção
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </>
    )
}