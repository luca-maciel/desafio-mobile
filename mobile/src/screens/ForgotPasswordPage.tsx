import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../types/RoutesTypes";

type NavigationProps =
  NativeStackNavigationProp<RootStackParamList>;

export default function ForgotPasswordPage() {
  const navigation = useNavigation<NavigationProps>();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendCode = async () => {
    console.log("Sending password recovery request...");
    setLoading(true);

    const response = await fetch(
        "http://172.20.10.2:8080/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
          }),
        },
      );

    const data = await response.json();
    if(!response.ok){
        console.log("erro ")
    }
    console.log(data);
    setLoading(false);

  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>

        <Text style={styles.title}>
          Forgot your password?
        </Text>

        <Text style={styles.subtitle}>
          Enter the email associated with your account and we'll
          help you reset your password.
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Email
          </Text>

          <TextInput
            style={[
              styles.input,
              error !== "" && styles.inputError,
            ]}
            placeholder="your@email.com"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          {error !== "" && (
            <Text style={styles.error}>
              {error}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            loading && styles.buttonDisabled,
          ]}
          onPress={handleSendCode}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading
              ? "Sending..."
              : "Send recovery code"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.backText}>
            ← Back to sign in
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  form: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#6b7280",
    marginBottom: 35,
  },

  inputContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 7,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#111827",
  },

  inputError: {
    borderColor: "#dc2626",
  },

  error: {
    color: "#dc2626",
    fontSize: 13,
    marginTop: 6,
  },

  button: {
    height: 52,
    backgroundColor: "#2563eb",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  backButton: {
    alignItems: "center",
    marginTop: 25,
  },

  backText: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "600",
  },
});