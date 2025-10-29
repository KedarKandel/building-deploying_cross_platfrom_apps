import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';

export default function AddBook() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddBook = async () => {
    if (!title) {
      Alert.alert('Validation', 'Title is required');
      return;
    }
    if (!user) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'books'), {
        title,
        author,
        notes,
        uid: user.uid,
        createdAt: serverTimestamp(),
      });
      router.replace('/'); // Go back to book list
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Book</Text>
      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Author"
        style={styles.input}
        value={author}
        onChangeText={setAuthor}
      />
      <TextInput
        placeholder="Notes"
        style={[styles.input, { height: 80 }]}
        multiline
        value={notes}
        onChangeText={setNotes}
      />
      <Button title={loading ? 'Adding...' : 'Add Book'} onPress={handleAddBook} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 16, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 12 },
});
