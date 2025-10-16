import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    if (!formData.name || !formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    //  delaying simulate req
    setTimeout(() => {
      setIsLoading(false);
      
      // Register user using context
      register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      
      Alert.alert('Success', 'Account created successfully!');
      router.replace('/(auth)/login');
    }, 1500);
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#08CB00" />
        <Text className="mt-4 text-gray-600">Creating your account...</Text>
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
          <Text className="text-3xl font-bold text-center mb-8">Register</Text>

          <TextInput
            placeholder="Full Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            className="w-full border border-gray-300 rounded-lg p-4 mb-4 text-lg"
            placeholderTextColor="#9CA3AF"
          />

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
            className="w-full border border-gray-300 rounded-lg p-4 mb-4 text-lg"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
            secureTextEntry
            className="w-full border border-gray-300 rounded-lg p-4 mb-6 text-lg"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
          />

          <TouchableOpacity
            onPress={handleRegister}
            className="w-full bg-green-600 rounded-lg p-4 mb-4"
          >
            <Text className="text-white text-center font-semibold text-lg">
              Register
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push('/(auth)/login')}
            className="mt-4"
          >
            <Text className="text-center text-gray-600 text-base">
              Already have an account?{' '}
              <Text className="text-green-600 font-semibold">Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}