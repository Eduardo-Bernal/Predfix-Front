import * as React from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { autenticacaoService } from '../../services/autenticacaoService';

export default function TelaLogin() {

  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [exibirSenha, setExibirSenha] = useState(false);
  const [lembrarDeMim, setLembrarDeMim] = useState(false);

  // Mantido caso precise futuramente, mas iniciado sem mensagens
  const [mensagemErro, setMensagemErro] = useState('');

  const entrarNaConta = () => {
    // Verificação removida para testes: entra direto sem validar campos
    setMensagemErro('');
    console.log('Login efetuado com sucesso (modo teste):', { email, senha, lembrarDeMim });
  };

  const aoMudarEmail = (texto: string) => {
    setEmail(texto);
    if (mensagemErro) setMensagemErro('');
  };

  const aoMudarSenha = (texto: string) => {
    setSenha(texto);
    if (mensagemErro) setMensagemErro('');
  };

  const temErro = Boolean(mensagemErro);


  async function acessar() {
    
      const emailDigitado = email.trim();
      const senhaDigitado = senha.trim();

      if(!emailDigitado || !senhaDigitado){
        Alert.alert("ATENÇÃO", "preencha todos os campos.");
        return;
      }

      try {
        await autenticacaoService.login({email: emailDigitado, senha: senhaDigitado})
        navigation.navigate("Listagem")
      } catch(error) {
        Alert.alert("Erro", "E-mail ou senha incorretos");
      }
    }

  return (
    <SafeAreaView style={estilos.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={estilos.conteudo}
        >
          {/* Cabeçalho com Logo e Título */}
          <View style={estilos.cabecalho}>
            <View style={estilos.linhaLogo}>
              <View style={estilos.caixaIcone}>
                <MaterialCommunityIcons
                  name="office-building-cog"
                  size={29}
                  color="#ffffff"
                />
              </View>
              <Text style={estilos.tituloMarca}>PrediFix</Text>
            </View>
            <Text style={estilos.subtitulo}>Acesse sua conta para continuar</Text>
          </View>

          {/* Formulário de Acesso */}
          <View style={estilos.formulario}>
            {/* Caixa de Alerta de Erro */}
            {temErro && (
              <View style={estilos.caixaAlertaErro}>
                <Ionicons
                  name="alert-circle-outline"
                  size={20}
                  color="#DC2626"
                  style={estilos.iconeAlerta}
                />
                <Text style={estilos.textoAlertaErro}>{mensagemErro}</Text>
              </View>
            )}

            {/* Campo de E-mail */}
            <View style={estilos.campoInput}>
              <Text style={estilos.rotulo}>E-MAIL</Text>
              <View
                style={[
                  estilos.caixaInput,
                  temErro && estilos.caixaInputErro,
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color="#9CA3AF"
                  style={estilos.iconeEsquerda}
                />
                <TextInput
                  style={estilos.input}
                  placeholder="email@predifix.com"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={aoMudarEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Senha */}
            <View style={estilos.campoInput}>
              <Text style={estilos.rotulo}>SENHA</Text>
              <View
                style={[
                  estilos.caixaInput,
                  temErro && estilos.caixaInputErro,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#9CA3AF"
                  style={estilos.iconeEsquerda}
                />
                <TextInput
                  style={estilos.input}
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  value={senha}
                  onChangeText={aoMudarSenha}
                  secureTextEntry={!exibirSenha}
                />
                <TouchableOpacity
                  onPress={() => setExibirSenha(!exibirSenha)}
                  style={estilos.botaoOlho}
                >
                  <Ionicons
                    name={exibirSenha ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Opção Lembrar de mim */}
            <View style={estilos.linhaOpcoes}>
              <TouchableOpacity
                style={estilos.opcaoLembrar}
                activeOpacity={0.7}
                onPress={() => setLembrarDeMim(!lembrarDeMim)}
              >
                <View
                  style={[
                    estilos.caixaSelecao,
                    lembrarDeMim && estilos.caixaSelecionada,
                  ]}
                >
                  {lembrarDeMim && (
                    <Ionicons name="checkmark" size={14} color="#ffffff" />
                  )}
                </View>
                <Text style={estilos.textoLembrar}>Lembrar de mim</Text>
              </TouchableOpacity>
            </View>

            {/* Botão de Entrar */}
            <TouchableOpacity
              style={estilos.botaoEntrar}
              activeOpacity={0.8}
              onPress={acessar}
            >
              <Text style={estilos.textoBotao}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },

  conteudo: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },

  cabecalho: {
    alignItems: 'center',
    marginBottom: 28,
  },

  linhaLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  caixaIcone: {
    width: 44,
    height: 44,
    backgroundColor: '#0046AD',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    paddingLeft: 3,
  },

  tituloMarca: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0046AD',
    letterSpacing: -0.5,
  },

  subtitulo: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },

  formulario: {
    width: '100%',
  },

  caixaAlertaErro: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FEE2E2',
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
  },

  iconeAlerta: {
    marginRight: 10,
    marginTop: 1,
  },

  textoAlertaErro: {
    flex: 1,
    fontSize: 13,
    color: '#991B1B',
    lineHeight: 18,
    fontWeight: '500',
  },

  campoInput: {
    marginBottom: 20,
  },

  rotulo: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4B5563',
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  caixaInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 9,
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: '#FFFFFF',
  },

  caixaInputErro: {
    borderColor: '#DC2626',
  },

  iconeEsquerda: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
  },

  botaoOlho: {
    padding: 4,
  },

  linhaOpcoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },

  opcaoLembrar: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  caixaSelecao: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },

  caixaSelecionada: {
    backgroundColor: '#0046AD',
    borderColor: '#0046AD',
  },

  textoLembrar: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },

  textoEsqueciSenha: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0046AD',
  },

  botaoEntrar: {
    backgroundColor: '#0046AD',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0046AD',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});