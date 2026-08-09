import { View, Text, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

type FormErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
};

export default function RegisterPage() {
  const navigation: any = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleRegister = async () => {
    // Limpa os erros anteriores
    setErrors({});
    setLoading(true);

    try {
      const response = await fetch(
        // sempre apontar para o ip da api
        "http://192.168.137.178:8080/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        if (data.details) {
          const newErrors: FormErrors = {};

          data.details.forEach((error: { field: string; message: string }) => {
            const field = error.field as keyof FormErrors;

            if (!newErrors[field]) {
              newErrors[field] = [];
            }

            newErrors[field]!.push(error.message);
          });

          setErrors(newErrors);
        }

        return;
      }
      console.log("user created - ", data);

      setSuccessMessage(true);

      setTimeout(() => {
        navigation.navigate("login");
      }, 3000);
    } catch (error) {
      console.error(
        "error when try to connect to api",
        error,
        "\nVerificar o ip da api",
      );
    } finally{
        setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 30,
          textAlign: "center",
        }}
      >
        Input your data
      </Text>
      {successMessage && (
        <View
          style={{
            backgroundColor: "#dcfce7",
            padding: 15,
            borderRadius: 8,
            marginBottom: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              color: "#166534",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            ✓ Conta criada com sucesso!
          </Text>
        </View>
      )}
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: errors.name ? "#ef4444" : "#ccc",
          borderRadius: 8,
          padding: 12,
          marginBottom: 5,
        }}
      />

      {errors.name?.map((error, index) => (
        <Text
          key={index}
          style={{
            color: "#ef4444",
            fontSize: 12,
            marginBottom: 3,
          }}
        >
          • {error}
        </Text>
      ))}

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          borderColor: errors.email ? "#ef4444" : "#ccc",
          borderRadius: 8,
          padding: 12,
          marginTop: 15,
          marginBottom: 5,
        }}
      />

      {errors.email?.map((error, index) => (
        <Text
          key={index}
          style={{
            color: "#ef4444",
            fontSize: 12,
            marginBottom: 3,
          }}
        >
          • {error}
        </Text>
      ))}

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: errors.password ? "#ef4444" : "#ccc",
          borderRadius: 8,
          padding: 12,
          marginTop: 15,
          marginBottom: 5,
        }}
      />

      {errors.password?.map((error, index) => (
        <Text
          key={index}
          style={{
            color: "#ef4444",
            fontSize: 12,
            marginBottom: 3,
          }}
        >
          • {error}
        </Text>
      ))}

      <View style={{ marginTop: 20 }}>
        <Button title={loading ? "Entering" : "Sign up"} onPress={handleRegister} />
      </View>
    </View>
  );
}
