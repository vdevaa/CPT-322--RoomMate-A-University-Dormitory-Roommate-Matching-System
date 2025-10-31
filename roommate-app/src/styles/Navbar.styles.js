import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabText: {
    color: '#555',
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#E34234',
    fontSize: 14,
    fontWeight: '800',
  },
});

export default styles;


