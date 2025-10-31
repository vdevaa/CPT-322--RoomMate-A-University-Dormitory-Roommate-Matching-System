import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  lockNote: {
    marginTop: 4,
    color: '#a00',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 12,
    paddingBottom: 4,
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  messageRowMine: {
    justifyContent: 'flex-end',
  },
  messageRowTheirs: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  bubbleMine: {
    backgroundColor: '#E34234',
    borderTopRightRadius: 4,
  },
  bubbleTheirs: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#eee',
  },
  bubbleText: {
    fontSize: 16,
  },
  bubbleTextMine: {
    color: '#fff',
  },
  bubbleTextTheirs: {
    color: '#222',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 24,
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: '#E34234',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendBtnDisabled: {
    backgroundColor: '#ddd',
  },
  sendText: {
    color: '#fff',
    fontWeight: '700',
  },
  sendTextDisabled: {
    color: '#999',
  },
});

export default styles;


