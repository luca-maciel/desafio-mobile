import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation:any = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <Button title="Login" onPress={()=>{navigation.navigate("login")}}/>
      <Text>Home</Text>
    </View>
  );
}