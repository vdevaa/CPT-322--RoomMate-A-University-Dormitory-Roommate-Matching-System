import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { getMessages, sendMessage, getConversations, getStoredUser } from '../services/api';
import styles from '../styles/ChatScreen.styles';

export default function ChatScreen({ route }) {
  const { conversationId } = route.params || {};
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    loadData();
    // Set up polling to refresh messages periodically
    const interval = setInterval(loadMessages, 2000);
    return () => clearInterval(interval);
  }, [conversationId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const user = await getStoredUser();
      if (!user) {
        Alert.alert('Error', 'Not logged in');
        return;
      }
      setCurrentUser(user);
      
      // Load conversation info
      try {
        const conversations = await getConversations();
        const convo = conversations.find(c => c.id === conversationId);
        if (convo) {
          setConversation({
            ...convo,
            otherUser: convo.otherUser || { name: 'Unknown', id: '' },
          });
        }
      } catch (error) {
        console.error('Error loading conversation:', error);
        // Continue anyway - we can still load messages
      }
      
      await loadMessages();
    } catch (error) {
      console.error('Error loading chat data:', error);
      Alert.alert('Error', 'Failed to load chat');
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async () => {
    try {
      const msgs = await getMessages(conversationId);
      // Transform API messages to display format
      const transformed = msgs.map(msg => ({
        id: msg._id || msg.id,
        conversationId,
        senderId: String(msg.from),
        text: msg.text,
        createdAt: new Date(msg.sentAt).getTime(),
      }));
      setMessages(transformed);
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;
    
    try {
      setSending(true);
      await sendMessage(conversationId, text);
      setInput('');
      // Reload messages to show the new one
      await loadMessages();
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const renderItem = ({ item }) => {
    const isMine = currentUser && String(item.senderId) === String(currentUser.id);
    return (
      <View style={[styles.messageRow, isMine ? styles.messageRowMine : styles.messageRowTheirs]}>
        <View style={[styles.bubble, isMine ? styles.bubbleMine : styles.bubbleTheirs]}>
          <Text style={[styles.bubbleText, isMine ? styles.bubbleTextMine : styles.bubbleTextTheirs]}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const isMatched = !!conversation;

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#E34234" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={80}>
        <View style={styles.header}>
          <Text style={styles.title}>{conversation?.otherUser?.name || 'Chat'}</Text>
          {!isMatched && (
            <Text style={styles.lockNote}>You can only message after you both match.</Text>
          )}
        </View>
        <FlatList
          ref={listRef}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={messages.sort((a, b) => a.createdAt - b.createdAt)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        />
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder={isMatched ? 'Type a message' : 'Matching required to message'}
            returnKeyType="send"
            onSubmitEditing={isMatched && !sending ? handleSend : undefined}
            editable={isMatched && !sending}
          />
          <TouchableOpacity 
            style={[styles.sendBtn, (!isMatched || sending) && styles.sendBtnDisabled]} 
            onPress={isMatched && !sending ? handleSend : undefined} 
            disabled={!isMatched || sending}
          >
            {sending ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={[styles.sendText, (!isMatched || sending) && styles.sendTextDisabled]}>Send</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

 


