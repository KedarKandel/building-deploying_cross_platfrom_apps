import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setIsLoading(true);
    
    // simulate delay req
    setTimeout(() => {
      setIsLoading(false);
      
      // login using context
      const loginSuccess = login(formData.email, formData.password);
      
      if (loginSuccess) {
        Alert.alert('Success', 'Logged in successfully!');
        router.replace('/(screens)/home');
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
    }, 1500);
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#08CB00" />
        <Text className="mt-4 text-gray-600">Signing you in...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6 mt-10">
          <Text className="text-3xl font-bold text-center mb-8">Login</Text>

          <TextInput
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            className="w-full border border-gray-300 rounded-lg p-4 mb-4 text-lg"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry
            className="w-full border border-gray-300 rounded-lg p-4 mb-6 text-lg"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
          />

          <TouchableOpacity
            onPress={handleLogin}
            className="w-full bg-green-600 rounded-lg p-4 mb-4"
          >
            <Text className="text-white text-center font-semibold text-lg">
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push('/(auth)/register')}
            className="mt-4"
          >
            <Text className="text-center text-gray-600 text-base">
              Don't have an account?{' '}
              <Text className="text-green-600 font-semibold">Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}