import { View, Text, ActivityIndicator } from 'react-native';

export default function Splash() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-3xl font-bold text-green-600 mb-4">MyApp</Text>
      <ActivityIndicator size="large" color="#08CB00" />
      <Text className="mt-4 text-gray-600">Loading...</Text>
    </View>
  );
}