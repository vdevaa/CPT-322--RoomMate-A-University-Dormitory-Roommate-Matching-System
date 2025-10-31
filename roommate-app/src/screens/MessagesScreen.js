import React, { useCallback, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import Navbar from '../components/Navbar';
import { conversations } from '../mock/messages';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles/MessagesScreen.styles';

export default function MessagesScreen({ navigation }) {
  const [data, setData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      // refresh from mock store whenever screen gains focus
      setData([...conversations]);
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.subtitle}>Matched conversations will appear here.</Text>
      </View>
      <FlatList
        style={styles.list}
        data={data
          .filter((c) => c.matched)
          .sort((a, b) => b.lastMessageAt - a.lastMessageAt)
        }
        extraData={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('Chat', { conversationId: item.id })}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.otherUser.name[0]}</Text>
            </View>
            <View style={styles.rowText}>
              <Text style={styles.name}>{item.otherUser.name}</Text>
              <Text style={styles.preview} numberOfLines={1}>{item.lastMessageText}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={{ padding: 24 }}>
            <Text style={{ textAlign: 'center', color: '#666' }}>No matches yet.</Text>
          </View>
        }
      />
      <Navbar navigation={navigation} active={'Messages'} />
    </SafeAreaView>
  );
}



