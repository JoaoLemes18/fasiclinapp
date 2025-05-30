import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5", // cor clara neutra

    paddingTop: 10,
  },
  profissionalContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#28A745",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
  },
  profissionalName: {
    fontSize: 18,
    fontWeight: "bold",
    bottom: 5,
    color: "#333",
  },
  profissionalDetails: {
    fontSize: 16,
    paddingBottom: 10,
    color: "#555",
    marginVertical: 2,
  },
  suspensaoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "absolute",
    top: 10,
    right: 10,
  },
  button: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12, // Tornando os botões arredondados
    marginLeft: 10, // Espaçamento entre os botões
  },
  editButton: {
    backgroundColor: "#007BFF", // Azul
  },
});
