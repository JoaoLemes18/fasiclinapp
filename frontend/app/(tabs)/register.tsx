import React, { useState } from "react";
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
import { especialidadesData } from "@/data/especialidades";
import Button from "@/components/Button";
import { useProfissional } from "../../context/ProfissionalContext"; // importe o hook

const conselhoOptions = [
  { label: "CRM", value: "CRM" },
  { label: "CREA", value: "CREA" },
  { label: "CRO", value: "CRO" },
  { label: "CRP", value: "CRP" },
  { label: "Outro", value: "OUTRO" },
];

const fakePessoas = [
  {
    ID_PESSOA: 8,
    ID_OUTRO: 26,
    CPF: "98765432100",
    NOME: "Maria Oliveira",
    DATA_NASC: "1985-10-12",
    SEXO: "F",
  },
  {
    ID_PESSOA: 9,
    ID_OUTRO: 27,
    CPF: "45678912300",
    NOME: "Carlos Souza",
    DATA_NASC: "1978-03-22",
    SEXO: "M",
  },
  {
    ID_PESSOA: 10,
    ID_OUTRO: 28,
    CPF: "45678912300",
    NOME: "Carlos Souza",
    DATA_NASC: "1978-03-22",
    SEXO: "M",
  },
  {
    ID_PESSOA: 11,
    ID_OUTRO: 29,
    CPF: "32165498700",
    NOME: "Ana Paula",
    DATA_NASC: "1992-07-15",
    SEXO: "F",
  },
  {
    ID_PESSOA: 12,
    ID_OUTRO: 30,
    CPF: "78912345600",
    NOME: "Ricardo Lima",
    DATA_NASC: "1980-11-30",
    SEXO: "M",
  },
  {
    ID_PESSOA: 13,
    ID_OUTRO: 31,
    CPF: "15975348600",
    NOME: "Fernanda Costa",
    DATA_NASC: "1995-02-18",
    SEXO: "F",
  },
  {
    ID_PESSOA: 14,
    ID_OUTRO: 32,
    CPF: "15975348600",
    NOME: "Fernanda Costa",
    DATA_NASC: "1995-02-18",
    SEXO: "F",
  },
  {
    ID_PESSOA: 15,
    ID_OUTRO: 33,
    CPF: "85274196300",
    NOME: "Roberto Martins",
    DATA_NASC: "1988-09-05",
    SEXO: "M",
  },
];

const Register = () => {
  const { adicionarProfissional } = useProfissional(); // pega a função do contexto

  const [formState, setFormState] = useState({
    cpf: "",
    tipo_prof: "",
    status_prof: "",
    cod_espec: "",
    conselho_prof: "",
    email_prof: "",
    senha_prof: "",
  });

  const [loadingPessoa, setLoadingPessoa] = useState(false);
  const [pessoaEncontrada, setPessoaEncontrada] = useState(null);
  const [camposHabilitados, setCamposHabilitados] = useState(false);
  const [profissionais, setProfissionais] = useState([]);

  const handleInput = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const buscarPessoaPorCPF = () => {
    const cpf = formState.cpf.trim();

    if (!cpf || cpf.length !== 11) {
      Alert.alert("Erro", "Digite um CPF válido (11 dígitos) para buscar.");
      return;
    }

    setLoadingPessoa(true);
    setPessoaEncontrada(null);
    setCamposHabilitados(false);

    setTimeout(() => {
      const pessoa = fakePessoas.find((p) => p.CPF === cpf);

      if (pessoa) {
        setPessoaEncontrada(pessoa);
        setCamposHabilitados(true);
      } else {
        Alert.alert(
          "Pessoa não encontrada",
          "Nenhuma pessoa cadastrada com esse CPF."
        );
      }

      setLoadingPessoa(false);
    }, 1000);
  };

  const handleSubmit = () => {
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

    if (
      !tipo_prof ||
      !status_prof ||
      !cod_espec ||
      !conselho_prof ||
      !email_prof ||
      !senha_prof
    ) {
      Alert.alert(
        "Erro",
        "Preencha todos os campos obrigatórios do profissional."
      );
      return;
    }

    const existe = profissionais.some(
      (prof) => prof.id_pessoa === pessoaEncontrada.ID_PESSOA
    );

    if (existe) {
      Alert.alert("Erro", "Profissional já cadastrado para esta pessoa.");
      return;
    }

    const novoProfissional = {
      id_pessoa: pessoaEncontrada.ID_PESSOA,
      tipo_prof,
      status_prof,
      cod_espec,
      conselho_prof,
      email_prof,
      senha_prof,
    };

    adicionarProfissional(novoProfissional);

    Alert.alert("Sucesso", "Profissional cadastrado com sucesso!");

    setFormState({
      cpf: "",
      tipo_prof: "",
      status_prof: "",
      cod_espec: "",
      conselho_prof: "",
      email_prof: "",
      senha_prof: "",
    });
    setPessoaEncontrada(null);
    setCamposHabilitados(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require("../../assets/images/fasiclin.png")}
          style={styles.logo}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Input
            label="CPF"
            placeholder="CPF"
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
            onPress={buscarPessoaPorCPF}
            disabled={loadingPessoa}
          >
            {loadingPessoa ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Buscar</Text>
            )}
          </TouchableOpacity>
        </View>

        {pessoaEncontrada && (
          <View style={{ marginBottom: 15 }}>
            <Text>Pessoa encontrada:</Text>
            <Text>Nome: {pessoaEncontrada.NOME}</Text>
            <Text>CPF: {pessoaEncontrada.CPF}</Text>
            <Text>Data Nasc: {pessoaEncontrada.DATA_NASC}</Text>
            <Text>Sexo: {pessoaEncontrada.SEXO}</Text>
          </View>
        )}

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
          {[
            { label: "Administrativo", value: "1" },
            { label: "Estagiário", value: "2" },
            { label: "Supervisor", value: "3" },
            { label: "Master", value: "4" },
          ].map((item) => (
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
          {[
            { label: "Ativo", value: "1" },
            { label: "Inativo", value: "2" },
            { label: "Suspenso", value: "3" },
          ].map((item) => (
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

        <Text style={styles.label}>Especialidade do Profissional</Text>
        <View style={styles.buttonGroup}>
          {especialidadesData.map((especialidade) => (
            <TouchableOpacity
              key={especialidade.cod_especialidade}
              style={[
                styles.button,
                formState.cod_espec === especialidade.cod_especialidade &&
                  styles.selectedButton,
                !camposHabilitados && { opacity: 0.5 },
              ]}
              onPress={() =>
                camposHabilitados &&
                handleInput("cod_espec", especialidade.cod_especialidade)
              }
              disabled={!camposHabilitados}
            >
              <Text style={styles.buttonText}>
                {especialidade.cod_especialidade} -{" "}
                {especialidade.especialidade}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Conselho Profissional</Text>
        <View style={styles.buttonGroup}>
          {conselhoOptions.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={[
                styles.button,
                formState.conselho_prof === item.value && styles.selectedButton,
                !camposHabilitados && { opacity: 0.5 },
              ]}
              onPress={() =>
                camposHabilitados && handleInput("conselho_prof", item.value)
              }
              disabled={!camposHabilitados}
            >
              <Text style={styles.buttonText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          onPress={handleSubmit}
          content={"Cadastrar"}
          disabled={!camposHabilitados}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
