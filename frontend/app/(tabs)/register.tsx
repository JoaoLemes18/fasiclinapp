import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";

import { styles } from "@/styles/Register";
import Input from "@/components/Input";
import Button from "@/components/Button";
import {
  buscarEspecialidades,
  Especialidade,
} from "@/services/especialidadeService";

import { deveMostrarCamposEspeciais } from "@/utils/visibilidadeCampos";
import { useProfissional } from "@/context/ProfissionalContext";
import { obterIdConselhoPorEspecialidade } from "@/utils/mapaEspecialidade";
import { buscarPessoaPorCPF } from "@/services/pessoaService";
import { buscarConselhos, Conselho } from "@/services/conselhoService";
import { cadastrarProfissional } from "@/services/profissionalService";

type Pessoa = {
  idPessoa: number;
  NOMEPESSOA: string;
  CPF: string;
  DATANASCPES: string;
  SEXOPESSOA: string;
};

interface FormState {
  cpf: string;
  tipo_prof: number | null;
  status_prof: number | null;
  cod_espec: string | null;
  conselho_prof: string | null;
  email_prof: string;
  senha_prof: string;
}

const tipoProfissionais = [
  { label: "Administrativo", value: 1 },
  { label: "Técnico Básico", value: 2 },
  { label: "Técnico Supervisor", value: 3 },
  { label: "Master", value: 4 },
];

const statusProfissionais = [
  { label: "Ativo", value: 1 },
  { label: "Inativo", value: 2 },
  { label: "Suspenso", value: 3 },
];

const Register = () => {
  const { adicionarProfissional } = useProfissional();
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [
      ...prev,
      `🕓 ${new Date().toLocaleTimeString()} - ${msg}`,
    ]);
  };

  const [formState, setFormState] = useState<FormState>({
    cpf: "",
    tipo_prof: null,
    status_prof: null,
    cod_espec: null,
    conselho_prof: null,
    email_prof: "",
    senha_prof: "",
  });

  const [conselhos, setConselhos] = useState<Conselho[]>([]);
  const [conselhosFiltrados, setConselhosFiltrados] = useState<Conselho[]>([]);
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
  const [loadingPessoa, setLoadingPessoa] = useState(false);
  const [loadingCadastro, setLoadingCadastro] = useState(false);
  const [pessoaEncontrada, setPessoaEncontrada] = useState<Pessoa | null>(null);
  const [camposHabilitados, setCamposHabilitados] = useState(false);

  const filtrarConselhosPorEspecialidade = (idEspec: number) => {
    const idConselho = obterIdConselhoPorEspecialidade(idEspec);
    if (idConselho && conselhos.length > 0) {
      const conselhoFiltrado = conselhos.filter(
        (c) => c.IDCONSEPROFI === idConselho
      );
      setConselhosFiltrados(conselhoFiltrado);
    } else {
      setConselhosFiltrados([]);
    }
  };

  const handleInput = <K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));

    // Se mudou a especialidade, filtre os conselhos
    if (field === "cod_espec" && typeof value === "string") {
      filtrarConselhosPorEspecialidade(Number(value));
      setFormState((prev) => ({ ...prev, conselho_prof: null }));
    }

    // Se o tipo for Administrativo ou Master, zere os campos de especialidade/conselho
    if (field === "tipo_prof" && (value === 1 || value === 4)) {
      setFormState((prev) => ({
        ...prev,
        cod_espec: null,
        conselho_prof: null,
      }));
      setConselhosFiltrados([]);
    }
  };

  useEffect(() => {
    const carregarConselhos = async () => {
      const data = await buscarConselhos();
      setConselhos(data);
    };
    carregarConselhos();
  }, []);

  useEffect(() => {
    const carregarEspecialidades = async () => {
      const data = await buscarEspecialidades();
      setEspecialidades(data);
    };
    carregarEspecialidades();
  }, []);

  const buscarPessoa = async () => {
    const cpf = formState.cpf.trim();

    if (!cpf || cpf.length !== 11) {
      Alert.alert("Erro", "Digite um CPF válido (11 dígitos) para buscar.");
      return;
    }

    setLoadingPessoa(true);
    setPessoaEncontrada(null);
    setCamposHabilitados(false);

    try {
      const pessoa = await buscarPessoaPorCPF(cpf);
      if (pessoa) {
        setPessoaEncontrada(pessoa);
        setCamposHabilitados(true);
      } else {
        Alert.alert(
          "Pessoa não encontrada",
          "Nenhuma pessoa cadastrada com esse CPF."
        );
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        Alert.alert(
          "Pessoa não encontrada",
          "Nenhuma pessoa cadastrada com esse CPF."
        );
      } else {
        Alert.alert("Erro", "Erro ao buscar pessoa. Tente novamente.");
      }
      console.error("Erro ao buscar pessoa:", error);
    } finally {
      setLoadingPessoa(false);
    }
  };

  const handleSubmit = async () => {
    const {
      tipo_prof,
      status_prof,
      cod_espec,
      conselho_prof,
      email_prof,
      senha_prof,
    } = formState;

    if (!pessoaEncontrada) {
      Alert.alert(
        "Erro",
        "Busque a pessoa pelo CPF antes de cadastrar o profissional."
      );
      return;
    }

    if (!tipo_prof || !status_prof || !email_prof || !senha_prof) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    // Apenas Técnico Básico ou Supervisor exigem especialidade/conselho
    const exigeEspecialidade = tipo_prof !== 1 && tipo_prof !== 4;

    if (exigeEspecialidade && (!cod_espec || !conselho_prof)) {
      Alert.alert(
        "Erro",
        "Especialidade e conselho são obrigatórios para esse tipo de profissional."
      );
      return;
    }

    setLoadingCadastro(true);

    try {
      const exigeEspec = tipo_prof !== 1 && tipo_prof !== 4;

      const profissionalData = {
        idPessoa: pessoaEncontrada.idPessoa,
        tipoProf: String(tipo_prof),
        statusProf: String(status_prof),
        emailProf: email_prof,
        senhaProf: senha_prof,
        ...(exigeEspec && {
          conselhoProf: String(conselho_prof),
          codEspec: String(cod_espec),
        }),
      };

      console.log("📦 Dados enviados ao backend:");
      console.log(JSON.stringify(profissionalData, null, 2));
      console.log("👤 Pessoa encontrada:", pessoaEncontrada);

      const sucesso = await cadastrarProfissional(profissionalData);

      if (sucesso) {
        adicionarProfissional(profissionalData);
        Alert.alert("Sucesso", "Profissional cadastrado com sucesso!");
        setFormState({
          cpf: "",
          tipo_prof: null,
          status_prof: null,
          cod_espec: null,
          conselho_prof: null,
          email_prof: "",
          senha_prof: "",
        });

        setPessoaEncontrada(null);
        setCamposHabilitados(false);
        setConselhosFiltrados([]);
      } else {
        Alert.alert("Erro", "Erro ao cadastrar profissional.");
      }
    } catch (error) {
      Alert.alert("Erro", "Erro ao cadastrar profissional. Tente novamente.");
      console.error(error);
    } finally {
      setLoadingCadastro(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require("../../assets/images/fasiclin.png")}
          style={styles.logo}
        />

        {/* CPF e botão buscar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Input
            label="CPF"
            placeholder="Digite o CPF (apenas números)"
            keyboardType="numeric"
            maxLength={11}
            value={formState.cpf}
            onChangeText={(text) => handleInput("cpf", text.replace(/\D/g, ""))}
            style={{ flex: 1 }}
          />
          <TouchableOpacity
            style={[
              styles.button,
              {
                marginLeft: 10,
                paddingHorizontal: 15,
                justifyContent: "center",
              },
            ]}
            onPress={buscarPessoa}
            disabled={loadingPessoa}
          >
            {loadingPessoa ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Buscar</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Dados da pessoa encontrada */}
        {pessoaEncontrada && (
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
              Pessoa encontrada:
            </Text>
            <Text>Nome: {pessoaEncontrada.nome || pessoaEncontrada.NOME}</Text>
            <Text>CPF: {pessoaEncontrada.cpf || pessoaEncontrada.CPF}</Text>
            <Text>
              Data Nasc:{" "}
              {pessoaEncontrada.dataNascimento || pessoaEncontrada.DATA_NASC}
            </Text>
            <Text>Sexo: {pessoaEncontrada.sexo || pessoaEncontrada.SEXO}</Text>
          </View>
        )}

        {/* Campos do profissional */}
        <Input
          label="E-mail"
          placeholder="email@exemplo.com"
          keyboardType="email-address"
          value={formState.email_prof}
          onChangeText={(text) => handleInput("email_prof", text)}
          editable={camposHabilitados}
        />

        <Input
          label="Senha"
          placeholder="Senha"
          secureTextEntry
          value={formState.senha_prof}
          onChangeText={(text) => handleInput("senha_prof", text)}
          editable={camposHabilitados}
        />

        <Text style={styles.label}>Tipo do profissional</Text>
        <View style={styles.buttonGroup}>
          {tipoProfissionais.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={[
                styles.button,
                formState.tipo_prof === item.value && styles.selectedButton,
                !camposHabilitados && { opacity: 0.5 },
              ]}
              onPress={() =>
                camposHabilitados && handleInput("tipo_prof", item.value)
              }
              disabled={!camposHabilitados}
            >
              <Text style={styles.buttonText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Status do profissional</Text>
        <View style={styles.buttonGroup}>
          {statusProfissionais.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={[
                styles.button,
                formState.status_prof === item.value && styles.selectedButton,
                !camposHabilitados && { opacity: 0.5 },
              ]}
              onPress={() =>
                camposHabilitados && handleInput("status_prof", item.value)
              }
              disabled={!camposHabilitados}
            >
              <Text style={styles.buttonText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {deveMostrarCamposEspeciais(formState.tipo_prof) && (
          <>
            <Text style={styles.label}>Especialidade do Profissional</Text>
            <View style={styles.buttonGroup}>
              {especialidades.map((item) => (
                <TouchableOpacity
                  key={item.IDESPEC}
                  style={[
                    styles.button,
                    formState.cod_espec === String(item.IDESPEC) &&
                      styles.selectedButton,
                    !camposHabilitados && { opacity: 0.5 },
                  ]}
                  onPress={() =>
                    camposHabilitados &&
                    handleInput("cod_espec", String(item.IDESPEC))
                  }
                  disabled={!camposHabilitados}
                >
                  <Text style={styles.buttonText}>
                    {item.CODESPEC} - {item.DESCESPEC}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Conselho Profissional</Text>
            <View style={styles.buttonGroup}>
              {conselhosFiltrados.map((item) => (
                <TouchableOpacity
                  key={item.IDCONSEPROFI}
                  style={[
                    styles.button,
                    formState.conselho_prof === String(item.IDCONSEPROFI) &&
                      styles.selectedButton,
                    !camposHabilitados && { opacity: 0.5 },
                  ]}
                  onPress={() =>
                    camposHabilitados &&
                    handleInput("conselho_prof", String(item.IDCONSEPROFI))
                  }
                  disabled={!camposHabilitados}
                >
                  <Text style={styles.buttonText}>
                    {item.ABREVCONS} - {item.DESCRICAO}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        <Button
          title={loadingCadastro ? "Cadastrando..." : "Cadastrar Profissional"}
          onPress={handleSubmit}
          content="Cadastrar Profissional"
        />

        {!__DEV__ && (
          <View
            style={{
              marginTop: 30,
              backgroundColor: "#111",
              padding: 10,
              borderRadius: 8,
              maxHeight: 200,
              width: "100%",
            }}
          >
            <Text
              style={{ color: "lime", fontWeight: "bold", marginBottom: 5 }}
            >
              📋 Logs da Tela:
            </Text>
            <ScrollView>
              {logs.map((log, index) => (
                <Text key={index} style={{ color: "lime", fontSize: 12 }}>
                  {log}
                </Text>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
