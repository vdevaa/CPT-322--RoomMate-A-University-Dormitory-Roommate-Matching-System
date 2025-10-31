// THIS MOCK CONVERSATION AND MESSAGE DATA WAS GENERATED USING CHATGPT

// CURRENTLY MESSAGES ARE STORED IN MEMORY, MEAINING IT IS STORED IN THE messagesByConversationId OBJECT

export const mockUserId = 'u_current';

export const conversations = [
  {
    id: 'c1',
    participants: ['u_current', 'u_anna'],
    otherUser: { id: 'u_anna', name: 'Anna Johnson' },
    matched: true,
    lastMessageText: 'See you tomorrow!',
    lastMessageAt: Date.now() - 1000 * 60 * 60,
  },
  {
    id: 'c2',
    participants: ['u_current', 'u_bob'],
    otherUser: { id: 'u_bob', name: 'Bob Lee' },
    matched: false, // example of unmatched conversation
    lastMessageText: 'Got it, thanks!',
    lastMessageAt: Date.now() - 1000 * 60 * 120,
  },
];

export const messagesByConversationId = {
  c1: [
    { id: 'm1', conversationId: 'c1', senderId: 'u_anna', text: 'Hey! Are you free to chat?', createdAt: Date.now() - 1000 * 60 * 180 },
    { id: 'm2', conversationId: 'c1', senderId: 'u_current', text: 'Yeah, what’s up?', createdAt: Date.now() - 1000 * 60 * 150 },
    { id: 'm3', conversationId: 'c1', senderId: 'u_anna', text: 'See you tomorrow!', createdAt: Date.now() - 1000 * 60 * 60 },
  ],
  c2: [
    { id: 'm4', conversationId: 'c2', senderId: 'u_bob', text: 'Can you share the link?', createdAt: Date.now() - 1000 * 60 * 240 },
    { id: 'm5', conversationId: 'c2', senderId: 'u_current', text: 'Sent. Check your email.', createdAt: Date.now() - 1000 * 60 * 200 },
    { id: 'm6', conversationId: 'c2', senderId: 'u_bob', text: 'Got it, thanks!', createdAt: Date.now() - 1000 * 60 * 120 },
  ],
};

export function appendLocalMessage(conversationId, message) {
  if (!messagesByConversationId[conversationId]) {
    messagesByConversationId[conversationId] = [];
  }
  messagesByConversationId[conversationId].push(message);
  // update last message preview on the conversation list
  const idx = conversations.findIndex((c) => c.id === conversationId);
  if (idx !== -1) {
    conversations[idx] = {
      ...conversations[idx],
      lastMessageText: message.text,
      lastMessageAt: message.createdAt,
    };
  }
}


