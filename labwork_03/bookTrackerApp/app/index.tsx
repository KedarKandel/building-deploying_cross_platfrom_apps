import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import BookItem from "../components/BookItem";

export default function Home() {
  const { user, initializing, logout } = useAuth();
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🧭 Handle redirect to welcome (must be outside condition!)
  useEffect(() => {
    if (!initializing && !user) {
      router.replace("/welcome");
    }
  }, [user, initializing]);

  //  Load user's books (only if user exists)
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "books"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetched = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(fetched);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching books:", error);
        Alert.alert("Firestore Error", "Failed to fetch books.");
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  //  Show loader while initializing or fetching data
  if (initializing || loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  //  Don’t render content if user not logged in (redirect happens above)
  if (!user) return null;

  //  Logged-in view
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Button title="Profile" onPress={() => router.push("/profile")} />
        <Button title="Add Book" onPress={() => router.push("/add-book")} />
        <Button title="Logout" onPress={logout} />
      </View>

      {books.length === 0 ? (
        <Text style={styles.emptyText}>No books yet. Add your first one!</Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BookItem
              book={item}
              onPress={() => router.push(`/book/${item.id}`)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", margin: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { textAlign: "center", marginTop: 20, fontSize: 16 },
});
