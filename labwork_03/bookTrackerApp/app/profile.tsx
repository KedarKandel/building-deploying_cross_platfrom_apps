import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

export default function Profile() {
  const { user, initializing, logout } = useAuth();
  const router = useRouter();

  if (initializing) return <Loading />;
  if (!user) {
    router.replace('/login');
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>

      <View style={{ marginTop: 30 }}>
        <Button
          title="Logout"
          color="#FF3B30"
          onPress={async () => {
            await logout();
            router.replace('/login');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '600', marginBottom: 24, textAlign: 'center' },
  label: { fontSize: 16, fontWeight: '500', marginBottom: 6 },
  value: { fontSize: 18, marginBottom: 12, color: '#333' },
});
