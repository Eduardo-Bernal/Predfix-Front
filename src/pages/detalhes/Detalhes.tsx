import React from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import {
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

import {
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";

import BottomNavBar from "../components/bottomNavBar";

import { RootStackParamList } from "../../routes/types";
import { useDetalheInspecao } from "../../hooks/useDetalheInspecao";
import { inspecaoService } from "../../services/inspecaoService";

export default function Detalhes() {
  const navigation = useNavigation<any>();

  const route =
    useRoute<RouteProp<RootStackParamList, "Detalhes">>();

  const { id } = route.params;

  const {
    inspecao,
    carregando,
    erro,
    dataFormatada,
  } = useDetalheInspecao(id);

  const audioUrl = inspecaoService.obterUrlAudio(id);

  const player = useAudioPlayer(audioUrl);
  const status = useAudioPlayerStatus(player);

  const tocarAudio = () => {
    if (status.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const formatarTempo = (segundos: number) => {
    if (!segundos) {
      return "00:00";
    }

    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = Math.floor(segundos % 60);

    return `${String(minutos).padStart(2, "0")}:${String(
      segundosRestantes
    ).padStart(2, "0")}`;
  };

  const progresso =
    status.duration > 0
      ? (status.currentTime / status.duration) * 100
      : 0;

  if (carregando) {
    return (
      <View style={styles.estadoContainer}>
        <ActivityIndicator
          size="large"
          color="#0D2B6B"
        />

        <Text style={styles.textoCarregando}>
          Carregando inspeção...
        </Text>
      </View>
    );
  }

  if (erro || !inspecao) {
    return (
      <View style={styles.estadoContainer}>
        <Ionicons
          name="alert-circle-outline"
          size={42}
          color="#E53935"
        />

        <Text style={styles.textoErro}>
          {erro || "Inspeção não encontrada."}
        </Text>

        <TouchableOpacity
          style={styles.botaoVoltarErro}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoBotaoVoltar}>
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const pendencia = inspecao.statusInspecao;

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={28}
            color="#0D2B6B"
          />
        </TouchableOpacity>

        <Text style={styles.tituloCabecalho}>
          Detalhes
        </Text>

        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.titulo}>
          {inspecao.equipamento}
        </Text>

        <View
          style={[
            styles.status,
            {
              backgroundColor: pendencia
                ? "#FDECEA"
                : "#E6F4EA",
            },
          ]}
        >
          <Ionicons
            name={
              pendencia
                ? "warning-outline"
                : "checkmark-circle-outline"
            }
            size={16}
            color={
              pendencia
                ? "#E53935"
                : "#2E7D32"
            }
          />

          <Text
            style={[
              styles.statusTexto,
              {
                color: pendencia
                  ? "#E53935"
                  : "#2E7D32",
              },
            ]}
          >
            {inspecao.statusTexto}
          </Text>
        </View>

        <View style={styles.cardInfo}>
          <View style={styles.linhaInfo}>
            <Ionicons
              name="location-outline"
              size={20}
              color="#757575"
            />

            <View style={styles.textosInfo}>
              <Text style={styles.rotulo}>
                Localização
              </Text>

              <Text style={styles.valor}>
                {inspecao.localizacao}
              </Text>
            </View>
          </View>

          <View style={styles.separador} />

          <View style={styles.linhaInfo}>
            <Ionicons
              name="business-outline"
              size={20}
              color="#757575"
            />

            <View style={styles.textosInfo}>
              <Text style={styles.rotulo}>
                Cliente
              </Text>

              <Text style={styles.valor}>
                {inspecao.cliente}
              </Text>
            </View>
          </View>

          <View style={styles.separador} />

          <View style={styles.linhaInfo}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color="#757575"
            />

            <View style={styles.textosInfo}>
              <Text style={styles.rotulo}>
                Data
              </Text>

              <Text style={styles.valor}>
                {dataFormatada}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.cardAudio}>
          <Text style={styles.tituloObservacao}>
            OBSERVAÇÃO DO TÉCNICO
          </Text>

          <View style={styles.areaAudio}>
            <TouchableOpacity
              style={styles.botaoPlay}
              onPress={tocarAudio}
            >
              <Ionicons
                name={
                  status.playing
                    ? "pause"
                    : "play"
                }
                size={30}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            <View style={styles.audioInfo}>
              <View style={styles.barraAudio}>
                <View
                  style={[
                    styles.progressoAudio,
                    {
                      width: `${progresso}%`,
                    },
                  ]}
                />
              </View>

              <View style={styles.tempos}>
                <Text style={styles.tempo}>
                  {formatarTempo(status.currentTime)}
                </Text>

                <Text style={styles.tempo}>
                  {formatarTempo(status.duration)}
                </Text>
              </View>
            </View>
          </View>
        </View>
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

  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  tituloCabecalho: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  conteudo: {
    padding: 16,
    paddingBottom: 120,
  },

  titulo: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 12,
  },

  status: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 5,
    marginBottom: 20,
  },

  statusTexto: {
    fontSize: 13,
    fontWeight: "700",
  },

  cardInfo: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },

  linhaInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  textosInfo: {
    marginLeft: 12,
    flex: 1,
  },

  rotulo: {
    fontSize: 12,
    color: "#9E9E9E",
    marginBottom: 3,
  },

  valor: {
    fontSize: 15,
    color: "#333333",
    fontWeight: "600",
  },

  separador: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 14,
  },

  cardAudio: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },

  tituloObservacao: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 20,
  },

  areaAudio: {
    flexDirection: "row",
    alignItems: "center",
  },

  botaoPlay: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#0D2B6B",
    alignItems: "center",
    justifyContent: "center",
  },

  audioInfo: {
    flex: 1,
    marginLeft: 16,
  },

  barraAudio: {
    height: 7,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
  },

  progressoAudio: {
    height: "100%",
    backgroundColor: "#0D2B6B",
  },

  tempos: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  tempo: {
    fontSize: 12,
    color: "#757575",
  },

  estadoContainer: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  textoCarregando: {
    marginTop: 12,
    fontSize: 15,
    color: "#757575",
  },

  textoErro: {
    marginTop: 12,
    fontSize: 15,
    color: "#E53935",
    textAlign: "center",
  },

  botaoVoltarErro: {
    marginTop: 20,
    backgroundColor: "#0D2B6B",
    paddingHorizontal: 24,
    paddingVertical: 11,
    borderRadius: 8,
  },

  textoBotaoVoltar: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});