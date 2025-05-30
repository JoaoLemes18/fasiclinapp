import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "white",
  },
  logo: {
    width: 320, // Defina o tamanho da logo
    height: 150,
    alignSelf: "center", // Centraliza a logo
    marginBottom: 20, // Espaço abaixo da logo
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  disabledButton: {
    opacity: 0.5,
  },

  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#6C757D",
    paddingVertical: 12, // Ajuste no espaçamento vertical
    paddingHorizontal: 25, // Ajuste no espaçamento horizontal
    borderRadius: 25, // Borda mais arredondada
    marginBottom: 15, // Margem inferior maior
    marginRight: 15, // Margem direita maior para mais espaçamento
    borderWidth: 1, // Adicionando uma borda sutil
    borderColor: "#6C757D", // Cor da borda combinando com o fundo
    alignItems: "center", // Alinha o conteúdo centralizado
    justifyContent: "center", // Garante que o texto fique no centro
    shadowColor: "#000", // Sombra sutil para dar profundidade
    shadowOffset: { width: 0, height: 4 }, // Deslocamento da sombra
    shadowOpacity: 0.1, // Opacidade da sombra
    shadowRadius: 6, // Raio da sombra
  },
  selectedButton: {
    backgroundColor: "#00a32a", // Cor quando o botão for selecionado
    borderColor: "#00a32a", // Borda na cor de seleção
    shadowColor: "#00a32a", // Sombra com a mesma cor
    shadowOpacity: 0.2, // Aumentando a opacidade da sombra quando selecionado
  },
  buttonText: {
    color: "#fff", // Cor do texto branca para contraste
    fontSize: 16, // Tamanho da fonte
    fontWeight: "bold", // Peso da fonte mais destacado
  },
});
