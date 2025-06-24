import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  logo: {
    width: 320,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
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
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginBottom: 15,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#6C757D",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  selectedButton: {
    backgroundColor: "#00a32a",
    borderColor: "#00a32a",
    shadowColor: "#00a32a",
    shadowOpacity: 0.2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardPessoa: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },

  cardTitulo: {
    fontSize: 15,
    fontWeight: "600",
    color: "#00a32a",
    marginBottom: 10,
  },

  linhaHorizontal: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 4, // se seu React Native suportar; senão use marginRight
  },

  labelEncontrada: {
    fontSize: 14,
    fontWeight: "600",
    color: "#00a32a",
    marginLeft: 8,
  },

  valor: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginLeft: 4,
  },
});
