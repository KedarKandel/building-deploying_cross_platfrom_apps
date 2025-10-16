import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    Alert.alert("Logged out", "You have been logged out");
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-3xl font-bold text-center mb-8">
          Welcome Home!
        </Text>
        <TouchableOpacity onPress={() => router.push('/(screens)/details')}>
          <Text className=" underline text-center font-semibold text-2xl text-blue-600">
            Go to details
          </Text>
        </TouchableOpacity>

        {user && (
          <View className="bg-green-50 p-6 rounded-lg mb-8 w-full">
            <Text className="text-lg font-semibold text-center text-green-800">
              Welcome back, {user.name}!
            </Text>
            <Text className="text-center text-green-600 mt-2">
              {user.email}
            </Text>
          </View>
        )}

        <Text className="text-lg text-gray-600 text-center mb-8">
          You have successfully logged in.
        </Text>

        <TouchableOpacity
          onPress={handleLogout}
          className="w-full bg-red-500 rounded-lg p-4"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
