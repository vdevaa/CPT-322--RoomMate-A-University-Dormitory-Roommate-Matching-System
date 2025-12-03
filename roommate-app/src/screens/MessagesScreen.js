import React, { useCallback, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Navbar from '../components/Navbar';
import { getConversations, getMessages, getStoredUser } from '../services/api';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles/MessagesScreen.styles';

// Transform API conversation to display format
const transformConversation = (apiConvo, currentUserId) => {
  const otherUser = apiConvo.otherUser || {};
  return {
    id: apiConvo.id,
    otherUser: {
      id: otherUser._id || otherUser.id,
      name: otherUser.name || 'Unknown',
    },
    matched: true, // All conversations from API are matches
    lastMessageText: apiConvo.lastMessageText || 'Start the conversation',
    lastMessageAt: apiConvo.lastMessageAt ? new Date(apiConvo.lastMessageAt).getTime() : Date.now(),
  };
};

export default function MessagesScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const user = await getStoredUser();
      const conversations = await getConversations();
      
      // Get last message for each conversation
      const conversationsWithMessages = await Promise.all(
        conversations.map(async (convo) => {
          try {
            const messages = await getMessages(convo.id);
            const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
            return {
              ...convo,
              lastMessageText: lastMessage ? lastMessage.text : 'Start the conversation',
              lastMessageAt: lastMessage ? new Date(lastMessage.sentAt).getTime() : convo.lastMessageAt ? new Date(convo.lastMessageAt).getTime() : Date.now(),
            };
          } catch (error) {
            console.error('Error loading messages for conversation:', error);
            return {
              ...convo,
              lastMessageText: 'Start the conversation',
              lastMessageAt: convo.lastMessageAt ? new Date(convo.lastMessageAt).getTime() : Date.now(),
            };
          }
        })
      );
      
      const transformed = conversationsWithMessages.map(c => transformConversation(c, user?.id));
      setData(transformed);
    } catch (error) {
      console.error('Error loading conversations:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadConversations();
    }, [])
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Messages</Text>
          <Text style={styles.subtitle}>Matched conversations will appear here.</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#E34234" />
        </View>
        <Navbar navigation={navigation} active={'Messages'} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.subtitle}>Matched conversations will appear here.</Text>
      </View>
      <FlatList
        style={styles.list}
        data={data.sort((a, b) => b.lastMessageAt - a.lastMessageAt)}
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



