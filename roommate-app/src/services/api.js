import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:8438/api';

// Token storage keys
const TOKEN_KEY = '@auth_token';
const USER_KEY = '@auth_user';

// Get stored token
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

// Store token and user
export const setAuth = async (token, user) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error storing auth:', error);
  }
};

// Clear auth
export const clearAuth = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Error clearing auth:', error);
  }
};

// Get stored user
export const getStoredUser = async () => {
  try {
    const userStr = await AsyncStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

// Make authenticated API request
export const apiRequest = async (endpoint, options = {}) => {
  const token = await getToken();
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Auth API calls
export const login = async (email, password) => {
  const response = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  await setAuth(response.token, response.user);
  return response;
};

export const register = async (email, password, name) => {
  const response = await apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  });
  await setAuth(response.token, response.user);
  return response;
};

// User API calls
export const getMe = async () => {
  return await apiRequest('/users/me');
};

// Profile API calls
export const getProfile = async (userId) => {
  return await apiRequest(`/profiles/${userId}`);
};

export const getMyProfile = async () => {
  const user = await getStoredUser();
  if (!user) throw new Error('Not logged in');
  return await getProfile(user.id);
};

export const updateProfile = async (userId, profileData) => {
  return await apiRequest(`/profiles/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
};

export const updateMyProfile = async (profileData) => {
  const user = await getStoredUser();
  if (!user) throw new Error('Not logged in');
  return await updateProfile(user.id, profileData);
};

// Matches API calls
export const getMatches = async () => {
  return await apiRequest('/matches');
};

export const getSuggestedMatches = async () => {
  return await apiRequest('/matches/recommendations');
};

export const likeUser = async (userId) => {
  return await apiRequest(`/matches/like/${userId}`, {
    method: 'POST',
  });
};

// Chats API calls
export const getConversations = async () => {
  return await apiRequest('/chats');
};

// Messages API calls
export const getMessages = async (conversationId) => {
  return await apiRequest(`/messages/${conversationId}`);
};

export const sendMessage = async (conversationId, text) => {
  return await apiRequest(`/messages/${conversationId}`, {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
};

