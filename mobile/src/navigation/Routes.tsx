import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import LoginPage from "../screens/LoginPage";
import RegisterPage from "../screens/RegisterPage";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="/home"
        component={Home}
      />

      <Stack.Screen name="login" component={LoginPage} />

      <Stack.Screen name="register" component={RegisterPage} />

    </Stack.Navigator>
  );
}