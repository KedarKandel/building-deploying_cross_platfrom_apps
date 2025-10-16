import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        backgroundColor: "pink",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style = {{fontSize:20, fontWeight:"bold", textAlign:"center"}}>Hello, this is my first React Native app by Kedar Kandel.</Text>
    </View>
  );
}
