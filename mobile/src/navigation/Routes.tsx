import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import LoginPage from "../screens/LoginPage";
import RegisterPage from "../screens/RegisterPage";
import { RootStackParamList } from "../types/RoutesTypes";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true, title:"" }}>
      {/* <Stack.Screen
        name="/home"
        component={Home}
      /> */}

      <Stack.Screen name="Login" component={LoginPage} />

      <Stack.Screen name="Register" component={RegisterPage} />

    </Stack.Navigator>
  );
}