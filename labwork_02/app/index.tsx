import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';

export default function Index() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      // Redirect to home if user is logged in, otherwise to login
      if (user) {
        router.replace('/(screens)/home');
      } else {
        router.replace('/(auth)/login');
      }
    }, 2000);
  }, [user]);

  return (
   
      <View className="flex-1 justify-center items-center">
        <Text className="text-3xl font-bold text-green-600 mb-4">MyApp</Text>
        <ActivityIndicator size="large" color="#08CB00" />
        <Text className="mt-4 text-gray-600">Loading...</Text>
      </View>
  
  );
}