import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

import {
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";

import BottomNavBar from "../components/bottomNavBar";
import { useNavigation } from "@react-navigation/native";


export default function Detalhes() {

  const navigation = useNavigation<any>();
  
  const player = useAudioPlayer(
    require("../../../assets/audio.mp3")
  );

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

    return `${minutos
      .toString()
      .padStart(2, "0")}:${segundosRestantes
      .toString()
      .padStart(2, "0")}`;
  };


  const progresso =
    status.duration > 0
      ? (status.currentTime / status.duration) * 100
      : 0;


  return (
    <View style={estilos.tudo}>

      <View style={estilos.cabecalho}>
        <TouchableOpacity onPress={() => navigation.navigate("Listagem")}>
          <Ionicons name="arrow-back" size={32} color="blue" />
        </TouchableOpacity>
        <Text style={estilos.titulo_cabecalho}> PrediFix </Text>
        <Ionicons name="share-outline" size={32} color="blue" />
      </View>


      <View style={estilos.linha} />


      <ScrollView
        style={estilos.conteudo}
        contentContainerStyle={estilos.conteudoInterno}
      >

        <Text style={estilos.titulo}> Elevador Social </Text>


        <View style={estilos.informacoes}>
          <Ionicons name="location-outline" size={20} color="black" />
          <Text style={estilos.subtitulo}> Condominio Solar </Text>
        </View>


        <View style={estilos.informacoes}>
          <Ionicons name="calendar-outline" size={20} color="black" />
          <Text style={estilos.subtitulo}> 25/10/2023 10:30 </Text>
        </View>


     <View style={estilos.card}>
  <Text style={estilos.texto_card}> OBSERVAÇÃO DO TÉCNICO </Text>

  <View style={estilos.areaAudio}>

    <TouchableOpacity style={estilos.botaoPlay} onPress={tocarAudio}>
      <Ionicons name={status.playing ? "pause" : "play"} size={32} color="white" />
    </TouchableOpacity>

    <View style={estilos.audioInfo}>

      <View style={estilos.barraAudio}>
        <View
          style={[
            estilos.progressoAudio,
            {
              width: `${progresso}%`,
            },
          ]}
        />
      </View>

      <View style={estilos.tempos}>
        <Text style={estilos.tempo}> {formatarTempo(status.currentTime)} </Text>
        <Text style={estilos.tempoTotal}> {formatarTempo(status.duration)} </Text>
      </View>

    </View>

  </View>
</View>


<TouchableOpacity style={estilos.botaoNovo}>
    <Ionicons name="pencil" size={22} color="white" />
  <Text style={estilos.textoBotaoNovo}> Editar Inspeção </Text>
</TouchableOpacity>

      </ScrollView>
            
      <BottomNavBar />

    </View>
  );
}


const estilos = StyleSheet.create({

  tudo: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    width: "100%",
  },



botaoNovo: {
  backgroundColor: "rgb(0, 60, 132)",
  width: "75%",
  height: 55,
  borderRadius: 8,
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  flexDirection: "row",
  gap:10,
  marginTop: 15,
},

   textoBotaoNovo: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },



  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },


  conteudo: {
    flex: 1,
    width: "100%",
  },


  conteudoInterno: {
    paddingBottom: 120,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },


  linha: {
    height: 1,
    backgroundColor: "#CCCCCC",
    width: "100%",
  },


  titulo_cabecalho: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },


  titulo: {
    color: "#000",
    fontSize: 25,
    fontWeight: "bold",
  },


  subtitulo: {
    color: "#787878",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
  },


  informacoes: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },


  card: {
    backgroundColor: "#FFF",
    width: "100%",
    marginTop: 20,
    padding: 17,
    borderRadius: 10,
    minHeight: 100,
    borderWidth: 2,
    borderColor: "#CCCCCC",
  },


  texto_card: {
    color: "#000",
    fontSize: 13,
    fontWeight: "bold",
  },


  texto_alerta: {
    color: "#ff0000",
    fontSize: 15,
    marginLeft: 5,
  },


  areaAudio: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
  },


  botaoPlay: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: "#004AAD",
    justifyContent: "center",
    alignItems: "center",
  },


  audioInfo: {
    flex: 1,
    marginLeft: 20,
  },


  barraAudio: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    overflow: "hidden",
  },


  progressoAudio: {
    height: "100%",
    backgroundColor: "#004AAD",
    borderRadius: 10,
  },


  tempos: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },


  tempo: {
    color: "#444",
    fontSize: 16,
  },


  tempoTotal: {
    color: "#B8BCC8",
    fontSize: 16,
  },

});