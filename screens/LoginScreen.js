import { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from "react-native";
import { AuthContext } from "../context/AuthContext";
import mascotasLogo from "../assets/image.png";

const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
      >
        <View style={styles.innerContainer}>
          <Image
              source={mascotasLogo}
              style={styles.logo}
          />

          <Text style={styles.title}>Ingresa a tu cuenta</Text>
          <Text style={styles.subtitle}>Bienvenido a la comunidad de mascotas</Text>

          <TextInput
              style={styles.input}
              placeholder="Usuario o correo electrónico"
              placeholderTextColor="#FF69B4"
              autoCapitalize="none"
              onChangeText={(text) => setUsername(text.trim().toLowerCase())}
          />

          <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#FF69B4"
              secureTextEntry
              onChangeText={setPassword}
          />

          <TouchableOpacity
              style={styles.button}
              onPress={() => login(username, password)}
          >
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#FF69B4",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#333333",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FF69B4",
    fontSize: 16,
    color: "#FF69B4",
  },
  button: {
    backgroundColor: "#FF69B4",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  logo:{
    height:250,
    width:350,
    alignSelf: 'center'
  }
});

export default LoginScreen;
