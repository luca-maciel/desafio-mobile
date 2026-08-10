import { ActivityIndicator, View } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomePage from "../screens/HomePage";
import LoginPage from "../screens/LoginPage";
import RegisterPage from "../screens/RegisterPage";

import { RootStackParamList } from "../types/RoutesTypes";
import { useAuth } from "../context/AuthContext";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        title:""
      }}
    >
      {user ? (
        <Stack.Screen
          name="Home"
          component={HomePage}
        />
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginPage}
          />

          <Stack.Screen
            name="Register"
            component={RegisterPage}
          />
        </>
      )}
    </Stack.Navigator>
  );
}