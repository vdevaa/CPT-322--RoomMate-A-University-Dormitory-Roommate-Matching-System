import React, { useMemo, useRef, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { messagesByConversationId, appendLocalMessage, conversations, mockUserId } from '../mock/messages';
import styles from '../styles/ChatScreen.styles';

export default function ChatScreen({ route }) {
  const { conversationId } = route.params || {};
  const conversation = useMemo(() => conversations.find(c => c.id === conversationId), [conversationId]);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([...(messagesByConversationId[conversationId] || [])]);
  const listRef = useRef(null);
  const isMatched = !!conversation?.matched;

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    const newMessage = {
      id: `local_${Date.now()}`,
      conversationId,
      senderId: mockUserId,
      text,
      createdAt: Date.now(),
    };
    appendLocalMessage(conversationId, newMessage);
    setMessages([...(messagesByConversationId[conversationId] || [])]);
    setInput('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 0);
  };

  const renderItem = ({ item }) => {
    const isMine = item.senderId === mockUserId;
    return (
      <View style={[styles.messageRow, isMine ? styles.messageRowMine : styles.messageRowTheirs]}>
        <View style={[styles.bubble, isMine ? styles.bubbleMine : styles.bubbleTheirs]}>
          <Text style={[styles.bubbleText, isMine ? styles.bubbleTextMine : styles.bubbleTextTheirs]}>{item.text}</Text>
        </View>
      </View>
    );
  };

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
            onSubmitEditing={isMatched ? handleSend : undefined}
            editable={isMatched}
          />
          <TouchableOpacity style={[styles.sendBtn, !isMatched && styles.sendBtnDisabled]} onPress={isMatched ? handleSend : undefined} disabled={!isMatched}>
            <Text style={[styles.sendText, !isMatched && styles.sendTextDisabled]}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

 


