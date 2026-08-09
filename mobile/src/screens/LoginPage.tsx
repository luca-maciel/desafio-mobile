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

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function LoginPage() {
  const navigation = useNavigation<NavigationProps>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log({
      email,
      password,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Welcome back 👋</Text>

        <Text style={styles.subtitle}>
          Sign in to your account to continue
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>

          <TextInput
            style={styles.input}
            placeholder="your@email.com"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#9ca3af"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => console.log("Password recovery")}
        >
          <Text style={styles.forgotText}>
            Forgot your password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>
            Sign in
          </Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            Don't have an account?
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.registerLink}>
              Create account
            </Text>
          </TouchableOpacity>
        </View>
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
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: "#6b7280",
    marginBottom: 35,
  },

  inputContainer: {
    marginBottom: 18,
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

  forgotButton: {
    alignSelf: "flex-end",
    marginBottom: 25,
  },

  forgotText: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "500",
  },

  loginButton: {
    height: 52,
    backgroundColor: "#2563eb",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
    gap: 5,
  },

  registerText: {
    color: "#6b7280",
    fontSize: 14,
  },

  registerLink: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "700",
  },
});