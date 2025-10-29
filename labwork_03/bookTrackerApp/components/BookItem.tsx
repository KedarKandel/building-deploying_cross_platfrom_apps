import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface BookItemProps {
  book: {
    id: string;
    title: string;
    author?: string;
    notes?: string;
  };
  onPress?: () => void;
}

export default function BookItem({ book, onPress }: BookItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <Text style={styles.title}>{book.title}</Text>
        {book.author ? <Text style={styles.author}>By {book.author}</Text> : null}
        {book.notes ? (
          <Text numberOfLines={1} style={styles.notes}>
            {book.notes}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  author: { fontSize: 14, color: '#555' },
  notes: { fontSize: 13, color: '#777', marginTop: 4 },
});
