import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { doc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import Loading from '../../components/Loading';
import { Book } from '@/types/book';

export default function BookDetail() {
  const { user, initializing } = useAuth();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  // Redirect unauthenticated users
  useEffect(() => {
    if (!initializing && !user) {
      router.replace('/login');
    }
  }, [user, initializing]);

  // Fetch book data
  useEffect(() => {
    if (!id || !user) return;

    const docRef = doc(db, 'books', id);
    const unsub = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setBook({
          id: snapshot.id,             // Document ID
          title: data.title,
          author: data.author,
          notes: data.notes,
          uid: data.uid,
          createdAt: data.createdAt,
        });
      } else {
        setBook(null);
      }
      setLoading(false);
    });

    return unsub;
  }, [id, user]);

  const handleDelete = async () => {
    if (!book) return;
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this book?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteDoc(doc(db, 'books', book.id));
            router.replace('/'); // Go back to book list
          } catch (error: any) {
            Alert.alert('Error', error.message);
          }
        },
      },
    ]);
  };

  if (initializing || loading) return <Loading />;
  if (!user) return null;

  if (!book) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Book not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.title}</Text>
      {book.author && <Text style={styles.author}>By {book.author}</Text>}
      {book.notes && <Text style={styles.notes}>{book.notes}</Text>}

      <View style={{ marginTop: 20 }}>
        <Button title="Delete Book" color="#FF3B30" onPress={handleDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 12 },
  author: { fontSize: 18, color: '#555', marginBottom: 8 },
  notes: { fontSize: 16, color: '#777' },
  message: { fontSize: 18, textAlign: 'center', marginTop: 50 },
});
